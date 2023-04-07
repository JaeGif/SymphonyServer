const Room = require('../models/Room');

const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

exports.rooms_get = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    rooms ? res.json({ rooms }).status(200) : res.sendStatus(404);
  } catch (err) {
    throw Error(err);
  }
};
exports.room_get = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    room ? res.json({ room }).status(200) : res.sendStatus(404);
  } catch (err) {
    throw Error(err);
  }
};
exports.room_post = async (req, res, next) => {
  const { users, id, public } = JSON.parse(req.body);
  let status = public || false;
  try {
    const room = new Room({
      users: users,
      _id: id,
      public: status,
    });
    await room.save();
  } catch (err) {
    throw Error(err);
  }
};
