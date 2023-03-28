const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./models/User');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const mongoDb = process.env.MONGO_DEV_URL; // DO NOT PUSH Mongo_DEV_URL
mongoose.set('strictQuery', true);
mongoose
  .connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log('mongo connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// passport.js config
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

server.listen(3001, () => {
  console.log('listening on 3001');
});

module.exports = app;
