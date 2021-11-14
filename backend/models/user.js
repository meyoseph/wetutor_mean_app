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
  location: [Number],
  profile: profileSchema,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
