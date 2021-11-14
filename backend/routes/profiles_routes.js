const express = require('express');
const router = express.Router();

const Profile = require('../models/profile');

router.get('/', async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({
    message: 'Profiles fetched succcesfully',
    profiles: profiles
  })
});

router.post('/', (req, res) => {
  const { firstname, lastname, gender, age, educationlevel, mainsubject, language, image, cv, status } = req.body;
  const profile = new Profile({
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    age: age,
    educationlevel: educationlevel,
    mainsubject: mainsubject,
    language:language,
    image: image,
    cv: cv,
    status: status
  });
  profile.save();
  res.status(201).json({
    message: 'Profile added successfully'
  });
})

module.exports = router;