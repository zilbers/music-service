const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
module.exports = app;
let requestID = 0;

function logger(req, res, next) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`
  );
  requestID += 1;
  next();
}

app.use(logger);
app.use(express.json());
app.use('/', express.static('../client/build/'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/', require('./api'));

app.get('/ping', (req, res) => {
  try {
    res.status(200).send('pong');
  } catch ({ message }) {
    res.status(500).send(message);
  }
});
