const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  recipient: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);
