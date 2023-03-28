const express = require('express'),
  User = require('../models/user'),
  jwt = require('jwt-simple');
const { default: mongoose } = require('mongoose');
const fs = require('fs');

exports.login = function (req, res) {
  console.log('Logged In');
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log('Error Happened In auth /token Route');
    } else {
      const payload = {
        id: user._id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
      };
      const token = jwt.encode(payload, process.env.JWT_SECRET);
      res.json({
        token: token,
        user: user._id,
      });
    }
  });
};

exports.register = function (req, res) {
  const { firstName, lastName, username, password } = req.body;
  const userId = mongoose.Types.ObjectId();

  fs.mkdirSync(`./uploads/${userId.toString()}`, { recursive: true });

  User.register(
    new User({
      _id: userId,
      firstName: firstName,
      lastName: lastName,
      username: username,
      bio: '',
      isModerator: false,
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
