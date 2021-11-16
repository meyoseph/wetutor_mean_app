const mongoose = require('mongoose');
const { stringify } = require('querystring');
const uniqueValidator = require('mongoose-unique-validator');

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
  email: { type: String, required: true, unique: true },
  password: String,
  phonenumber: String,
  location: { type: [Number], index: '2dsphere'},
  profile: Object,
  user_type: String
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
