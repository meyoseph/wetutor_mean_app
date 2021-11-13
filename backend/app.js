require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profiles_routes');
const app = express();

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('connected to db...');
}).catch(() => {
  console.log('connection failed...')
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profileRoutes)

module.exports = app;
