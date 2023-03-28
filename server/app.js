const express = require('express');
const app = express();
const config = require('./utilities/config');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./models/User');

const MongoStore = require('connect-mongo');
const session = require('express-session')({
  secret: config.SECRET,
  resave: true,
  store: MongoStore.create({ mongoUrl: config.MONGO_URL }),
  saveUninitialized: false,
});
app.use(session);

const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const auth = require('./middleware/auth.js')();

const mongoDb = config.MONGO_URL; // DO NOT PUSH Mongo_DEV_URL
mongoose.set('strictQuery', true);
console.log(config.MONGO_URL);
mongoose
  .connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log('mongo connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// passport.js config
app.use(auth.initialize());
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('api/users', usersRouter);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`sockets open ${socket.id}`);
  socket.on('message', (data) => {
    socket.broadcast.emit('broadcast_message', data);
  });
});
/* io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
}); */

server.listen(config.PORT, () => {
  console.log('listening on 3001');
});

module.exports = { server, io };
