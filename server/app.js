const express = require('express');
require('dotenv').config();

const app = express();
module.exports = app;
let requestID = 0;

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/', require('./api'));

module.exports = app;
