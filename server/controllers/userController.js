const express = require('express'),
  User = require('../models/User'),
  jwt = require('jwt-simple');
const { mongoose } = require('mongoose');
const fs = require('fs');

exports.user_get = async (req, res, next) => {
  console.log('looking');
  const user = await User.findById(req.params.id);
  user ? res.json({ user }).status(200) : res.sendStatus(400);
};
exports.users_get = async (req, res, next) => {
  let { q, l } = req.query;
  let limit = l || 5;
  let query = q || null;

  console.log(query);
  if (query) {
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    }).limit(limit);
    users ? res.json({ users }).status(200) : res.sendStatus(400);
  } else {
    const users = await User.find({});
    users ? res.json({ users }).status(200) : res.sendStatus(400);
  }
};
