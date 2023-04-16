const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

exports.login = async function (req, res) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      console.log(user);
      const payload = {
        id: user._id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
      };
      const token = jwt.encode(payload, process.env.JWT_SECRET);
      res.json({
        token: token,
        user: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.register = function (req, res) {
  console.log(req.body);
  const { firstName, lastName, username, password, email, isModerator } =
    req.body;
  const userId = new mongoose.Types.ObjectId();

  if (process.env.NODE_ENV !== 'test') {
    fs.mkdirSync(`./public/uploads/${userId.toString()}`, { recursive: true });
  } else {
    fs.mkdirSync(`./public/TESTuploads/${userId.toString()}`, {
      recursive: true,
    });
  }

  User.register(
    new User({
      _id: userId,
      firstName: firstName || '',
      lastName: lastName || '',
      username: username,
      email: email || '',
      bio: '',
      isModerator: isModerator || false,
      avatar: 'none',
    }),
    password,
    function (err, msg) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
};
