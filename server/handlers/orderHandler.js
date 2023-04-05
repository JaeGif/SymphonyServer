const Message = require('../models/Message');
const Room = require('../models/Room');

const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

module.exports = (io, socket) => {
  const joinRoomOrder = (payload) => {
    console.log('User joined room#:', payload);
    socket.join(payload);
  };
  const sendOrder = (payload) => {
    console.log(payload);
    saveMessage(payload);
    socket.to(payload.room).emit('recieve_message', payload);
  };

  const disconnectOrder = () => {
    console.log(`User disconnected ${socket.id}`);
  };

  socket.on('join_room', joinRoomOrder);
  socket.on('disconnect', disconnectOrder);
  socket.on('send_message', sendOrder);
};

async function saveMessage(payload) {
  const message = new Message({
    user: { _id: payload.user._id, username: payload.user.username },
    room: payload.room,
    message: payload.message,
    timestamp: payload.timestamp,
  });
  await message.save();
  console.log('done');
}
