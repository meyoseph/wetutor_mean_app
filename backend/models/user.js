const mongoose = require('mongoose');
const { stringify } = require('querystring');

const profileSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  gender: String,
  age: Number,
  educationlevel: String,
  mainsubject: String,
  language: String,
  image: String,
  cv: String,
  status: String
});

const userSchema = mongoose.Schema({
  email: string,
  password: string,
  phonenumber: string,
  location: string,
  profile: profileSchema
});

module.exports = mongoose.model('User', userSchema);
