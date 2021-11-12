const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const profiles = [
    { firstname: "yoseph",
    lastname: "birhanu",
    gender: "male",
    age: 27,
    educationlevel: "degree",
    mainsubject: "go",
    language: "amharic",
    image: "test",
    cv: "test",
    status: "active"
   },
   { firstname: "yoseph",
    lastname: "birhanu",
    gender: "male",
    age: 27,
    educationlevel: "degree",
    mainsubject: "go",
    language: "amharic",
    image: "test",
    cv: "test",
    status: "active"
  },
  { firstname: "yoseph",
    lastname: "birhanu",
    gender: "male",
    age: 27,
    educationlevel: "degree",
    mainsubject: "go",
    language: "amharic",
    image: "test",
    cv: "test",
    status: "active"
  }
  ]
  res.status(200).json({
    message: 'Profiles fetched succcesfully',
    profiles: profiles
  })
});

router.post('/', (req, res) => {
  const profile = req.body;
  console.log(profile);
  res.status(201).json({
    message: 'Profile added successfully'
  });
})

module.exports = router;
