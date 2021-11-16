const User = require('../models/user');


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
        $set: {"profile.status" : 'Inactive'}
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({message : 'Student successfully updated!'})
        }
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
