require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

DB_URL= process.env.DB_URL;
const profileRoutes = require('./routes/profiles_routes');
const userRoutes = require('./routes/user_routes');
const adminRoutes = require('./routes/admin_routes');
const app = express();

mongoose.connect(DB_URL).then(() => {
  console.log('connected to db...');
}).catch(() => {
  console.log('connection failed...')
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profileRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
module.exports = app;
