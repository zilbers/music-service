const express = require('express');
const mysqlCon = require('./modules/connections');
require('dotenv').config();

const app = express();
module.exports = app;
let requestID = 0;
const { database, password, user } = process.env;

function logger(req, res, next) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`,
  );
  requestID += 1;
  next();
}

app.use(logger);
app.use(express.json());
app.use('/', express.static('../client/build/'));

// Routes
app.use('/api/login', require('./routes/login'));
app.use('/api/search', require('./routes/search'));
app.use('/api/songs', require('./routes/songs'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/artists', require('./routes/artists'));
