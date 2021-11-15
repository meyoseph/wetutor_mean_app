require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

DB_URL= "mongodb+srv://aboneh:man1230ab@cluster0.yt5q8.mongodb.net/profiles?retryWrites=true&w=majority";

const profileRoutes = require('./routes/profiles_routes');
<<<<<<< HEAD
const userRoutes = require('./routes/user_routes')
=======
const userRoutes = require('./routes/user_routes');
>>>>>>> main
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
<<<<<<< HEAD
=======

>>>>>>> main
module.exports = app;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular8-meanstack-angular-material/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
})

app.listen(3000);