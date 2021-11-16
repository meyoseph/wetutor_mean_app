export interface User{
  email: { type: String, required: true, unique: true },
  phonenumber: String,
  profile: Object,
  user_type: String
}


// const profileSchema = mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   gender: String,
//   age: Number,
//   educationlevel: String,
//   mainsubject: String,
//   language: String,
//   image: String,
//   cv: String,
//   status: String
// });