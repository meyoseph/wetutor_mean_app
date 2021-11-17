const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Client } = require('@elastic/elasticsearch');
const { query } = require("express");
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
const { apiGetAll, apiGetOne, apiPost, apiDelete, apiUpload, addUser } = require("../controller/parent");

const client = new Client({ node: process.env.ES_ADDRESS })
const router = express.Router();


router.get('/tutors', checkAuth, apiGetAll);
// router.get('/search/:id', search);
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

const userArrayParent = [
  {"id":1,"email":"rfranklen0@nbcnews.com","password":"Hjj9evKGl","location": [], "user_type": "parent"},
  {"id":2,"email":"gpudding1@dailymail.co.uk","password":"j0zayo","location": [], "user_type": "parent"},
  {"id":3,"email":"clevensky2@goo.ne.jp","password":"wt7A6s","location": [], "user_type": "parent"},
  {"id":4,"email":"mmuckleston3@sakura.ne.jp","password":"I0Fss3","location":[], "user_type": "parent"},
  {"id":5,"email":"vbudibent4@usatoday.com","password":"1bxW3L6bFtfP","location": [], "user_type": "parent"},
  {"id":6,"email":"jcamacho5@apple.com","password":"ZBg9c7PG","location": [], "user_type": "parent"},
  {"id":7,"email":"ojuggings6@amazon.co.jp","password":"OSWr1Zbb","location": [], "user_type": "parent"},
  {"id":8,"email":"odashper7@flavors.me","password":"oJ0DDP","location": [], "user_type": "parent"},
  {"id":9,"email":"csimkiss8@so-net.ne.jp","password":"N6kobylip2","location": [], "user_type": "parent"},
  {"id":10,"email":"dmaclure9@seattletimes.com","password":"oDtzbufHnr","location": [], "user_type": "parent"}
]

const profile = [
{"firstname":"Erv","lastname":"Baynham","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"602-646-7389", "mainsubject":"Ruby"},
{"firstname":"Letty","lastname":"Melanaphy","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"913-804-2475", "mainsubject":"Golang"},
{"firstname":"Gilemette","lastname":"Abramof","gender":"male","age":28,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"680-675-2649", "mainsubject":"java"},
{"firstname":"Winna","lastname":"Limb","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"185-933-5761", "mainsubject":"React"},
{"firstname":"Hartwell","lastname":"Szantho","gender":"female","age":22,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"925-152-3590", "mainsubject":"Angular"},
{"firstname":"Kore","lastname":"Selcraig","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"975-568-1231", "mainsubject":"Node"},
{"firstname":"Marylee","lastname":"McBeith","gender":"female","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"706-316-2659", "mainsubject":"Scala"},
{"firstname":"Michail","lastname":"Elsbury","gender":"male","age":21,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"437-725-0429", "mainsubject":"Erlang"},
{"firstname":"Suki","lastname":"Kop","gender":"female","age":25,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"148-569-7449", "mainsubject":"Elixir"},
{"firstname":"Jo","lastname":"Blogg","gender":"male","age":24,"educationlevel":"BCS","language":"English","status":"active", "phonenumber":"252-117-1716", "mainsubject":"Reactnative"}]



const usertuts = [{"id":1,"email":"goldis0@hud.gov","password":"12345","location":[],"user_type": "tutor","profile": profile[0]},
{"id":2,"email":"sclash1@wikimedia.org","password":"12345","location":[],"user_type": "tutor","profile": profile[1]},
{"id":3,"email":"akiefer2@si.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[2]},
{"id":4,"email":"bdumelow3@berkeley.edu","password":"12345","location":[],"user_type": "tutor","profile": profile[3]},
{"id":5,"email":"eharbar4@csmonitor.com","password":"12345","location":[],"user_type": "tutor","profile": profile[4]},
{"id":6,"email":"gwebermann5@microsoft.com","password":"12345","location":[],"user_type": "tutor","profile": profile[5]},
{"id":7,"email":"tthornber6@examiner.com","password":"12345","location":[],"user_type": "tutor","profile": profile[6]},
{"id":8,"email":"mamanger7@usatoday.com","password":"12345","location":[],"user_type": "tutor","profile": profile[7]},
{"id":9,"email":"bfarenden8@live.com","password":"12345","location":[],"user_type": "tutor","profile": profile[8]},
{"id":10,"email":"rfahy9@weebly.com","password":"12345","location":[],"user_type": "tutor","profile": profile[9]}]



router.post('/seed', checkAuth, (req, res) => {
  User.insertMany(usertuts).then(response => {
    res.status(201).json({ result: response })
  });
})

router.get("/search", checkAuth, async(req, res) => {
    await client.indices.refresh({ index: process.env.ELASTICINDEX })
    let query = { index: process.env.ELASTICINDEX }
    if (req.query.term) query.q = `*${req.query.term}*`;
    await client.search(query).then(response => {
        return res.status(200).json({
            users: response.body.hits.hits
        })
    });
});

module.exports = router;
