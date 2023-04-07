const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    public: { type: Boolean },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model('Room', RoomSchema);
