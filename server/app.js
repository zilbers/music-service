const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
module.exports = app;

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

app.use(logger);
app.use(express.json());

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  database: 'music_service',
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/api/songs', (req, res) => {
  mysqlCon.query('SELECT * FROM songs', (error, results, fields) => {
    if (error) {
      res.send(err.message);
    }
    res.send(results);
  });
});

app.get('/song/:id', async (req, res) => {
  mysqlCon.query('SELECT * FROM songs WHERE song_id = ? AND song_name = ?', [req.params.id, 'asdf'], (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    }
    res.send(results);
  });
});
