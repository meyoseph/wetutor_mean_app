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


//get all
module.exports.apiGetAll = async (req, res,next) => {
//     const parenet = User.findById(req.params.id);
//     const {location} = parenet;
//     const {long, lat} = location;
// await User.find({location : {$near:[long, lat] }},(error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)

User.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
    }
  })
}

module.exports.search =  async (req, res, next) => {
   // const {text} = req.params.
    await User.find({$text : {$search: req.params.text}}, 
    (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
    }).clone()
   }