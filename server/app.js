const express = require('express');
const mysql = require('mysql');
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

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  database: 'music_service',
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySql!');
});

// Get all songs
app.get('/api/songs', (req, res) => {
  mysqlCon.query('SELECT * FROM songs', (error, results, fields) => {
    if (error) {
      res.status(500).send(err.message);
    }
    res.send(results);
  });
});

// Get song by ID
app.get('/api/songs/:id', async (req, res) => {
  mysqlCon.query('SELECT * FROM songs WHERE song_id = ?',
    [req.params.id], (error, results, fields) => {
      if (error) {
        res.status(500).send(err.message);
        throw error;
      }
      results[0] ? res.send(results) : res.status(404).send('No song with this ID');
    });
});

// Get all artists
app.get('/api/artists', (req, res) => {
  mysqlCon.query('SELECT * FROM artists', (error, results, fields) => {
    if (error) {
      res.status(500).send(err.message);
    }
    res.send(results);
  });
});

// Get artist by ID
app.get('/api/artists/:id', async (req, res) => {
  mysqlCon.query('SELECT * FROM artists WHERE artist_id = ?',
    [req.params.id], (error, results, fields) => {
      if (error) {
        res.status(500).send(err.message);
        throw error;
      }
      results[0] ? res.send(results) : res.status(404).send('No artists with this ID');
    });
});

// Get all albums
app.get('/api/albums', (req, res) => {
  mysqlCon.query('SELECT * FROM albums', (error, results, fields) => {
    if (error) {
      res.status(500).send(err.message);
    }
    res.send(results);
  });
});

// Get album by ID
app.get('/api/albums/:id', async (req, res) => {
  mysqlCon.query('SELECT * FROM albums WHERE album_id = ?',
    [req.params.id], (error, results, fields) => {
      if (error) {
        res.status(500).send(err.message);
        throw error;
      }
      results[0] ? res.send(results) : res.status(404).send('No albums with this ID');
    });
});
