require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profiles_routes');
const app = express();

const DB_URL='mongodb+srv://root:1276@alehegncluster.59f47.mongodb.net/profiles?retryWrites=true&w=majority';

mongoose.connect(DB_URL).then(() => {
  console.log('connected to db...');
}).catch(() => {
  console.log('connection failed...')
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profileRoutes)

app.listen(3000,() => {
  console.log('listening to port 3000');
})


app.all('*',(req,res,next)=>{
  next(new Error("rout not found"));
})
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


module.exports = app;
