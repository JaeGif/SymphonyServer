const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  email: { type: String, required: true },
  lastName: { type: String },
  bio: { type: String, maxLength: 150 },
  username: { type: String, required: true },
  password: { type: String, minLength: 6 },
  website: { type: String },
  isModerator: { type: Boolean },
  avatar: { type: String },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
});

// plugin to handle passwords
UserSchema.plugin(passportLocalMongoose);

// Export model
module.exports = mongoose.model('User', UserSchema);
