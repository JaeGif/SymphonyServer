const Message = require('../models/Message');
const Room = require('../models/Room');

const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

exports.saveMessage = async (payload) => {
  const message = new Message({
    user: { _id: payload.user._id, username: payload.user.username },
    room: payload.room,
    message: payload.message,
    timestamp: payload.timestamp,
  });
  await message.save();
  console.log('done');
};
