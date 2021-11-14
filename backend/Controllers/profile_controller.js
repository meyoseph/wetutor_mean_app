const Profile = require('../models/profile');
// const ObjectId = require('mongoose').Types.ObjectId;

getProfileById = async (req, res, next) => {
    Profile.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  }

addProfile = (req, res, next) => {
    Profile.create(req.body, (error, data) =>{
        if (error) {
            return next(error)
          } else {
            res.status(201).json({
                message: 'Profile added successfully',data
              });
          }
    })
//     const profile = new Profile({
//       firstname: firstname,
//       lastname: lastname,
//       gender: gender,
//       age: age,
//       educationlevel: educationlevel,
//       mainsubject: mainsubject,
//       language:language,
//       image: image,
//       cv: cv,
//       status: status
//     });
//     profile.save();
//     res.status(201).json({
//       message: 'Profile added successfully',
//     });
  }

  updateProfile = async (req, res, next) => {
    await Profile.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({message : 'Student successfully updated!'})
        }
      })
  }

  deleteProfile = async (req, res, next) => {
    Profile.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: "profile deleted successfully"
          })
        }
      })
  }


  module.exports = {
      getProfileById,
      addProfile,
      updateProfile,
      deleteProfile
  }
