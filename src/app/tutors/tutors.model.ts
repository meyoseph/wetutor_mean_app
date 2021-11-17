export interface User {
  _id: string,
  email: string,
  password: string,
  profile: {
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    educationlevel: string;
    mainsubject: string;
    language: string;
    status: string;
  },
  user_type: string;
}
