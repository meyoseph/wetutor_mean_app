const { profile } = require('console');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Profile = require('../models/profile');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');

router.get('/', checkAuth, async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({
    message: 'Profiles fetched succcesfully',
    profiles: profiles
  })
});

router.post('/:id', checkAuth, (req, res) => {
  User.updateOne({ _id: req.params.id }, { profile: req.body }).then(response => {
    res.status(201).json({
      message: 'Profile added successfully',
      result: response
    });
  })
})

module.exports = router;
