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

// Get all
app.get('/api/lists/:table', (req, res) => {
  const { table } = req.params;
  mysqlCon.query(`SELECT * FROM ${table}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    }
    res.send(results);
  });
});

// Get by ID
app.get('/api/lists/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  mysqlCon.query(`SELECT * FROM ${table} WHERE ${table.slice(0, -1)}_id = ?`,
    [id], (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
        throw error;
      }
      results[0] ? res.send(results) : res.status(404).send(`No ${req.params.table} with this ID`);
    });
});

// Get the top charts
app.get('/api/top/:table', (req, res) => {
  if (req.params.table === 'albums') {
    mysqlCon.query(`SELECT albums.album_id, albums.name, COUNT(user_liked_albums.album_id) AS likes
    FROM music_service.albums
    JOIN music_service.user_liked_albums ON albums.album_id=user_liked_albums.album_id
    GROUP BY album_id
    ORDER BY likes DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      }
      res.send(results);
    });
  }

  if (req.params.table === 'playlists') {
    mysqlCon.query(`SELECT playlists.playlist_id, playlists.name, COUNT(user_playlists.playlist_id) AS saves
    FROM music_service.user_playlists
    JOIN music_service.playlists ON playlists.playlist_id=user_playlists.playlist_id
    GROUP BY playlist_id
    ORDER BY saves DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      }
      res.send(results);
    });
  }

  if (req.params.table === 'songs') {
    mysqlCon.query(`SELECT user_liked_songs.song_id, songs.title, COUNT(user_liked_songs.song_id) AS likes
    FROM music_service.user_liked_songs
    JOIN music_service.songs ON user_liked_songs.song_id=songs.song_id
    GROUP BY song_id
    ORDER BY likes DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      }
      res.send(results);
    });
  }
});
