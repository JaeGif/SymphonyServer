const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    roomId: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model('Room', RoomSchema);
