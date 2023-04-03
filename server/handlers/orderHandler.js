const Message = require('../models/Message');

module.exports = (io, socket) => {
  const joinRoomOrder = (payload) => {
    console.log('User joined room#:', payload);
    socket.join(payload);
  };
  const sendOrder = (payload) => {
    console.log(payload);
    socket.to(payload.room).emit('recieve_message', payload);
  };

  const disconnectOrder = () => {
    console.log(`User disconnected ${socket.id}`);
  };

  socket.on('join_room', joinRoomOrder);
  socket.on('disconnect', disconnectOrder);
  socket.on('send_message', sendOrder);
};
