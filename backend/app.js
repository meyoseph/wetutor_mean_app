const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profiles_routes');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profileRoutes)

module.exports = app;
