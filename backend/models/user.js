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
  email: String,
  password: String,
  phonenumber: String,
  location: String,
  profile: profileSchema,
  
},
{collection: 'user'}
);

module.exports = mongoose.model('User', userSchema);
