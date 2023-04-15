const Room = require('../models/Room');

const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

exports.rooms_get = async (req, res, next) => {
  let { topic, title, popular, cursor, returnLimit } = req.query;
  returnLimit = returnLimit || 10;
  cursor = cursor || 0;
  popular = popular || false;
  const skipBy = parseInt(cursor);
  console.log(popular);

  if (topic || title) {
    // search query
    let topicQuery;
    let titleQuery;
    topic ? (topicQuery = new RegExp(topic, 'i')) : (topicQuery = /[\s\S]*/);
    title ? (titleQuery = new RegExp(title, 'i')) : (titleQuery = /[\s\S]*/);

    console.log(topicQuery, titleQuery);
    try {
      const rooms = await Room.find({
        topic: topicQuery,
      })
        .find({ title: titleQuery })
        .find({ public: true })
        .sort({ users: -1 })
        .skip(skipBy)
        .limit(returnLimit);
      console.log(rooms);
      rooms ? res.json({ rooms }).status(200) : res.sendStatus(404);
    } catch (err) {
      throw Error(err);
    }
  } else if (popular) {
    try {
      const rooms = await Room.find({}).sort({ users: -1 }).limit(returnLimit);
      rooms ? res.json({ rooms }).status(200) : res.sendStatus(404);
    } catch (err) {
      throw Error(err);
    }
  } else {
    try {
      const rooms = await Room.find({});
      rooms ? res.json({ rooms }).status(200) : res.sendStatus(404);
    } catch (err) {
      throw Error(err);
    }
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
  let { users, public, title, topic } = req.body;
  users = JSON.parse(users);
  let userIdx = [];
  for (let i = 0; i < users.length; i++) {
    userIdx.push(users[i].user._id);
  }
  let status = public || true;
  let titleAlt = title || '';
  if ((!title && users.length > 0) || (title === '' && users.length > 0)) {
    for (let i = 0; i < users.length; i++) {
      if (users[i]) {
        titleAlt += ', ' + users[i].user.username;
      }
      if (i === 2 && users.length > 3) {
        const length = users.length - 3;
        titleAlt += `and ${length} more...`;
        break;
      }
    }
  }
  try {
    const id = new mongoose.Types.ObjectId();
    const room = new Room({
      users: userIdx,
      _id: id,
      public: status,
      title: titleAlt,
      topic: topic,
    });

    await User.updateMany({ _id: { $in: userIdx } }, { $push: { rooms: id } });
    await room.save();
    return res.json({ room: id }).status(200);
  } catch (err) {
    throw new Error(err);
  }
};
exports.room_put = async (req, res, next) => {
  console.log(req.body);

  let { order, user, room } = req.body;
  user = user || null;
  room = room || null;
  console.log(order, user, room);

  switch (order) {
    case 'userLeaving':
      try {
        const roomDoc = await Room.findByIdAndUpdate(room, {
          $pull: { users: user },
        });
        if (roomDoc) {
          return res
            .json({ message: `Successfully left ${roomDoc}` })
            .status(200);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        throw new Error(error);
      }

    default:
      return res.json({ err: 'No order specified' }).status(400);
  }
};
