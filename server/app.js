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
app.use('/api/', require('./api'));

app.use('/', express.static('../client/build/'));

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

// Login
app.post('/api/login', (req, res) => {
  const { email, pass } = req.body;
  const query = `CALL music_service.login('${email}','${pass}')`;
  mysqlCon.query((query), (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0][0]);
  });
});

// Search
app.get('/api/search', (req, res) => {
  const { filter } = req.query;
  const query = `SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at, songs.youtube_link
  FROM music_service.songs 
  JOIN artists ON songs.artist_id = artists.artist_id
  WHERE songs.title LIKE '${filter}%'`;
  mysqlCon.query(query,
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.status(200).send(results);
    });
});

// Get all from songs
app.get('/api/songs', (req, res) => {
  mysqlCon.query('CALL get_all_songs()',
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send(results[0]);
    });
});

// Get all from albums
app.get('/api/albums', (req, res) => {
  mysqlCon.query('CALL get_all_albums()',
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send(results[0]);
    });
});

// Get liked songs
app.get('/api/top/liked/songs:id', (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_user_likedSongs(?)', [id],
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send(results[0]);
    });
});

// Get all from playlists
app.get('/api/playlists', (req, res) => {
  mysqlCon.query('CALL get_all_playlists()',
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send(results[0]);
    });
});

// Get all from artists
app.get('/api/artists', (req, res) => {
  mysqlCon.query('CALL get_all_artists()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0]);
  });
});

// Get by songs ID
app.get('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_song_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return results[0][0] ? res.send(results[0]) : res.status(404).send('No song with this ID');
    });
});

// Get by albums ID
app.get('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_albums_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      results[0][0] ? res.send(results[0]) : res.status(404).send('No album with this ID');
    });
});

// Get by playlists ID
app.get('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_playlists_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      results[0][0] ? res.send(results[0]) : res.status(404).send('No playlist with this ID');
    });
});

// Get by artist ID
app.get('/api/artists/:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_artist_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      results[0][0] ? res.send(results[0]) : res.status(404).send('No playlist with this ID');
    });
});

// Get the songs that are in the playlist
app.get('/api/playlists/:id/list', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_songs_inPlaylist(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      res.send(results[0]);
    });
});

// Get the songs that are in the album
app.get('/api/albums/:id/list', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_songs_inAlbum(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      res.send(results[0]);
    });
});

// Get the songs that are in the album
app.get('/api/artists/:id/list', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_songs_ofArtist(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
        throw error;
      }
      res.send(results[0]);
    });
});

// Get the top songs
app.get('/api/top/songs', (req, res) => {
  mysqlCon.query('CALL get_top_songs()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0]);
  });
});

// Get the top albums
app.get('/api/top/albums', (req, res) => {
  mysqlCon.query('CALL get_top_ablums()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0]);
  });
});

// Get the top playlists
app.get('/api/top/playlists', (req, res) => {
  mysqlCon.query('CALL get_top_playlists()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0]);
  });
});

// Get the top artists
app.get('/api/top/artists', (req, res) => {
  mysqlCon.query('CALL get_top_artists()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send(results[0]);
  });
});

// Post new data to songs
app.post('/api/songs', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(collums, values);
  mysqlCon.query(`INSERT INTO \`${database}\`.\`songs\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send('Uploaded new song');
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
      return res.status(500).send(error.message);
    }
    res.status(200).send('Uploaded new album');
  });
});

// Post new data to playlists
app.post('/api/playlists', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`${database}\`.\`playlists\` (${collums}, uploaded_at) 
    VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send('Uploaded new playlist');
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
      return res.status(500).send(error.message);
    }
    res.status(200).send('Uploaded new artist');
  });
});

// Like song
app.post('/api/songs/like', async (req, res) => {
  const { user_id, song_id } = req.body;
  mysqlCon.query('CALL like_song(?,?)',
    [user_id, song_id], (error, results, fields) => {
      if (error) {
        mysqlCon.query('CALL remove_likeSong(?,?)',
          [user_id, song_id], (err1, res1, fields) => {
            if (err1) {
              return res.status(500).send('Error with action');
            }
            console.log('remove like');
            return res.send(res1[0]);
          });
      } else {
        res.send(results[0]);
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
