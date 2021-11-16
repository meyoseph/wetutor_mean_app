const User = require("../backend/models/user");
const admin = new User({ email: 'admin@gmail.com', password: '123456', phonenumber: '', location: [], profile: null, user_type: 'admin '});
admin.save();
