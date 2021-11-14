const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
  const data = await fetch('https://geolocation-db.com/json/');
  let location = [];
  location.push(data.latitude);
  location.push(data.longitude);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      phonenumber: req.body.phonenumber,
      location: location,
      profile: null
    });
    user.save().then(response => {
      res.status(201).json({
        message: 'User created',
        result: response
      })
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    })
  });
});

module.exports = router;
