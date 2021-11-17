const User = require('../models/user');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: process.env.ES_ADDRESS,
  auth: {
      username: process.env.ES_USERNAME,
      password: process.env.ES_PASSWORD
  }
})

module.exports.getAllUserProfiles = (req, res) => {
  User.find({
    user_type: "tutor"
  }).then(response => {
    res.status(201).json({
      message: 'success',
      users: response
    });
  })
}
module.exports.getUserById = async (req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

module.exports.updateUserStatus = (req, res, next) => {
     User.findByIdAndUpdate(req.params.id, {
        $set: {"profile.status" : 'active'}
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({message : 'Student successfully updated!'})
        }
      }).then(res => {
        user = User.findOne({ _id: req.params.id })
        client.index({
          index: process.env.ELASTICINDEX,
          id: user._id,
          body: user
        }).then(res => console.log(res)).catch(console.error)
      })
  }

module.exports.deleteUser = async (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data) {
        res.status(200).json({
          msg: "profile deleted successfully"
        })
      }else{
          res.json({msg: "No user found"})
      }
    }next()
  })
}
