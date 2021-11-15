const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  gender: String,
  age: Number,
  educationlevel: String,
  mainsubject: String,
  language: String,
  status: String
});

module.exports = mongoose.model('Profile', profileSchema);
