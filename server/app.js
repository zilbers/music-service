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

// Get all from songs
app.get('/api/songs', (req, res) => {
  mysqlCon.query('SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at FROM music_service.songs JOIN artists ON songs.artist_id = artists.artist_id;',
    (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
});

// Get all from albums
app.get('/api/albums', (req, res) => {
  mysqlCon.query('SELECT albums.album_id as id, albums.name as name, artists.name as artist, created_at FROM music_service.albums JOIN artists ON albums.artist_id = artists.artist_id;',
    (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
});

// Get all from playlists
app.get('/api/playlists', (req, res) => {
  mysqlCon.query('SELECT playlist_id as id, name, created_at FROM music_service.playlists;',
    (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).send(results);
      }
    });
});

// Get all from artists
app.get('/api/artists', (req, res) => {
  mysqlCon.query('SELECT artist_id as id, name FROM music_service.artists;', (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results);
    }
  });
});

// Get by songs ID
app.get('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at FROM music_service.songs JOIN artists ON songs.artist_id = artists.artist_id WHERE song_id = ?',
    [id], (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
        throw error;
      } else {
        results[0] ? res.send(results) : res.status(404).send('No song with this ID');
      }
    });
});

// Get by albums ID
app.get('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('SELECT albums.album_id as id, albums.name as name, artists.name as artist, created_at FROM music_service.albums JOIN artists ON albums.artist_id = artists.artist_id WHERE album_id = ?',
    [id], (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
        throw error;
      } else {
        results[0] ? res.send(results) : res.status(404).send('No album with this ID');
      }
    });
});

// Get by playlists ID
app.get('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('SELECT playlist_id as id, name, created_at FROM music_service.playlists WHERE playlist_id = ?',
    [id], (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
        throw error;
      } else {
        results[0] ? res.send(results) : res.status(404).send('No $playlist with this ID');
      }
    });
});

// Get the top songs
app.get('/api/top/songs', (req, res) => {
  mysqlCon.query(`SELECT user_liked_songs.song_id AS id, songs.title AS name, COUNT(user_liked_songs.song_id) AS likes
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
});

// Get the top albums
app.get('/api/top/albums', (req, res) => {
  mysqlCon.query(`SELECT albums.album_id AS id, albums.name AS name, COUNT(user_liked_albums.album_id) AS likes
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
});

// Get the top playlists
app.get('/api/top/playlists', (req, res) => {
  mysqlCon.query(`SELECT playlists.playlist_id AS id, playlists.name AS name, COUNT(user_playlists.playlist_id) AS likes
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
});

// Post new data to songs
app.post('/api/songs', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`${database}\`.\`songs\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Uploaded new song');
    }
  });
});

// Post new data to albums
app.post('/api/albums', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`${database}\`.\`albums\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Uploaded new album');
    }
  });
});

// Post new data to palylists
app.post('/api/palylists', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`${database}\`.\`palylists\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Uploaded new palylist');
    }
  });
});

// Post new data to artists
app.post('/api/artists', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`${database}\`.\`artists\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Uploaded new artist');
    }
  });
});

// Update song data in the database
app.put('/api/songs/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  mysqlCon.query(`UPDATE \`songs\`.\`${req.params.table}\` 
  SET ${query} 
  WHERE song_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Updated song');
    }
  });
});

// Update albums data in the database
app.put('/api/albums/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  mysqlCon.query(`UPDATE \`albums\`.\`${req.params.table}\` 
  SET ${query} 
  WHERE album_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Updated album');
    }
  });
});

// Update artist data in the database
app.put('/api/artists/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  mysqlCon.query(`UPDATE \`${database}\`.\`artists\` 
  SET ${query} 
  WHERE artist_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Updated artist');
    }
  });
});

// Update playlist data in the database
app.put('/api/playlists/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  const { table } = req.params;
  mysqlCon.query(`UPDATE \`${database}\`.\`playlists\` 
  SET ${query} 
  WHERE playlist_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Updated playlist');
    }
  });
});

// Delete data from database
app.delete('/api/songs/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`${database}\`.\`songs\` 
  WHERE song_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Deleted song');
    }
  });
});

// Delete data from database
app.delete('/api/albums/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`${database}\`.\`albums\` 
  WHERE album_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Deleted album');
    }
  });
});

// Delete data from database
app.delete('/api/playlists/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`${database}\`.\`playlists\` 
  WHERE playlist_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Deleted playlist');
    }
  });
});

// Delete data from database
app.delete('/api/artists/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`${database}\`.\`artists\` 
  WHERE artist_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Deleted artist');
    }
  });
});
