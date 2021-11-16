let User = require('../models/user');

//post

module.exports.addUser = ((req, res, next) => {
   User.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });

module.exports.apiGetAll = async (req, res,next) => {
  const user = User.findOne({ _id: req.params.id })
  const loc = user.location
  // User.find({ location: { '$near': loc , '$maxDistance': 0.10 }}).then(response => {
  //   res.json(response)
  // })
  User.find({ 'profile.status': "active", user_type: "tutor" }).then(response => {
    res.status(200).json({ result: response})
  })
}

// module.exports.search =  async (req, res, next) => {
//    // const {text} = req.params.
//     await User.find({$text : {$search: req.params.text}},
//     (error, data) => {
//         if (error) {
//           return next(error)
//         } else {
//           res.json(data)
//         }
//     }).clone()
// }
