const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const user = require('../models/user');
const { apiGetAll, apiGetOne, apiPost, apiDelete, apiUpload, search, addUser } = require("../controller/parent");

router.get('/tutors/:id', apiGetAll);
router.get('/search/:id', search);
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


router.post('/login', (req, res) => {
  let dbUser;
  User.findOne({ email: req.body.email }).then(user => {
    if(!user){
      return res.status(401).json({ message: 'Auth Failed' });
    }
    dbUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({ message: 'Auth Failed' })
    }
    const token = jwt.sign({ email: dbUser.email, userId: dbUser._id, userType: dbUser.user_type },
      process.env.JWT_SECRETE, { expiresIn: "1h" });
    return res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: dbUser._id,
      userType: dbUser.user_type
    })
  }).catch(err => {
    return res.status(401).json({ message: 'Auth Failed' })
  });
});

module.exports = router;
