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
app.get('/api/songs/top', (req, res) => {
  mysqlCon.query('CALL get_top_songs()', (error, results, fields) => {
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
