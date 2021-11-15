const express = require('express');
const router = express.Router();

const Profile = require('../models/profile');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({
    message: 'Profiles fetched succcesfully',
    profiles: profiles
  })
});

router.post('/', checkAuth, (req, res) => {
  const { firstname, lastname, gender, age, educationlevel, mainsubject, language, status } = req.body;
  const profile = new Profile({
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    age: age,
    educationlevel: educationlevel,
    mainsubject: mainsubject,
    language:language,
    status: status
  });
  profile.save();
  res.status(201).json({
    message: 'Profile added successfully'
  });
})

module.exports = router;
