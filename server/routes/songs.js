/* eslint-disable camelcase */
const { Router } = require('express');
const mysqlCon = require('../modules/connections');

const songsRouter = Router();

// Get all songs
songsRouter.get('/', (req, res) => {
  mysqlCon.query('CALL get_all_songs()',
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.status(200).send(results[0]);
    });
});

// Get song by ID
songsRouter.get('/song_:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_song_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return results[0][0] ? res.send(results[0]) : res.status(404).send('No song with this ID');
    });
});

// Get the top songs
songsRouter.get('/top', (req, res) => {
  mysqlCon.query('CALL get_top_songs()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send(results[0]);
  });
});

// Get liked songs by user ID
songsRouter.get('/liked/:id', (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_user_likedSongs(?)', [id],
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.status(200).send(results[0]);
    });
});

// Post new data to songs
songsRouter.post('/', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(collums, values);
  mysqlCon.query(`INSERT INTO \`songs\` (${collums}, uploaded_at)
      VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send('Uploaded new song');
  });
});

// Like song
songsRouter.post('/like', async (req, res) => {
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
        return res.send(results[0]);
      }
    });
});

// Update song data in the database
songsRouter.put('/:id', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``);
  const values = req.body.values.map((value) => `'${value}'`);
  const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

  mysqlCon.query(`UPDATE \`songs\`.\`${req.params.table}\` 
  SET ${query} 
  WHERE song_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send('Updated song');
  });
});

// Delete data from database
songsRouter.delete('/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`songs\` 
  WHERE song_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send('Deleted song');
  });
});

module.exports = songsRouter;
