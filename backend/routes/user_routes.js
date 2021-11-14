const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
  const response = await axios.get('https://geolocation-db.com/json/');
  const { data } = response;
  const { latitude, longitude } = data;
  let location = [];
  location.push(latitude);
  location.push(longitude);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      phonenumber: req.body.phonenumber,
      location: location,
      profile: null,
      user_type: req.body.userType
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
