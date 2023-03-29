module.exports = (io, socket) => {
  const joinRoomOrder = (payload) => {
    console.log('User joined room#:', payload);
  };
  const sendOrder = (payload) => {
    console.log(payload);
    socket.broadcast.emit('broadcast_message', payload);
  };

  const disconnectOrder = () => {
    console.log(`User disconnected ${socket.id}`);
  };

  socket.on('join_room', joinRoomOrder);
  socket.on('message', sendOrder);
  socket.on('disconnect', disconnectOrder);
};
