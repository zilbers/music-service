const express = require('express');
const mysql = require('mysql');
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

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user,
  password,
  database,
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySql!');
});

// Get all from a certain table
app.get('/api/lists/:table', (req, res) => {
  const { table } = req.params;
  mysqlCon.query(`SELECT * FROM ${table}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results);
    }
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
      } else {
        results[0] ? res.send(results) : res.status(404).send(`No ${req.params.table} with this ID`);
      }
    });
});

// Get the top charts
app.get('/api/top/:table', (req, res) => {
  if (req.params.table === 'albums') {
    mysqlCon.query(`SELECT albums.album_id, albums.name, COUNT(user_liked_albums.album_id) AS likes
    FROM ${database}.albums
    JOIN ${database}.user_liked_albums ON albums.album_id=user_liked_albums.album_id
    GROUP BY album_id
    ORDER BY likes DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
  }

  if (req.params.table === 'playlists') {
    mysqlCon.query(`SELECT playlists.playlist_id, playlists.name, COUNT(user_playlists.playlist_id) AS saves
    FROM ${database}.user_playlists
    JOIN ${database}.playlists ON playlists.playlist_id=user_playlists.playlist_id
    GROUP BY playlist_id
    ORDER BY saves DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
  }

  if (req.params.table === 'songs') {
    mysqlCon.query(`SELECT user_liked_songs.song_id, songs.title, COUNT(user_liked_songs.song_id) AS likes
    FROM ${database}.user_liked_songs
    JOIN ${database}.songs ON user_liked_songs.song_id=songs.song_id
    GROUP BY song_id
    ORDER BY likes DESC
    LIMIT 20`, (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
  }
});

// Post new data to the database
app.post('/api/:table', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const { table } = req.params;
  mysqlCon.query(`INSERT INTO \`${database}\`.\`${req.params.table}\` (${collums}, upload_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(`Uploaded new ${table.slice(0, -1)}`);
    }
  });
});

// Update data in the database
app.put('/api/:table/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  const { table } = req.params;
  mysqlCon.query(`UPDATE \`${database}\`.\`${req.params.table}\` 
  SET ${query} 
  WHERE ${table.slice(0, -1)}_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(`Updated ${table.slice(0, -1)}`);
    }
  });
});

// Delete data from database
app.delete('/api/:table/:id', (req, res) => {
  const { table } = req.params;
  mysqlCon.query(`DELETE FROM \`${database}\`.\`${req.params.table}\` 
  WHERE ${table.slice(0, -1)}_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(`Deleted ${table.slice(0, -1)}`);
    }
  });
});
