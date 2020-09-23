const { Router } = require('express');
const mysqlCon = require('../modules/connections');

const albumRouter = Router();

// Get all from albums
albumRouter.get('/', (req, res) => {
  mysqlCon.query('CALL get_all_albums()',
    (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.status(200).send(results[0]);
    });
});

// Get by albums ID
albumRouter.get('/album_:id', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_albums_byId(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return results[0][0] ? res.send(results[0]) : res.status(404).send('No album with this ID');
    });
});

// Get the songs that are in the album
albumRouter.get('/album_:id/list', async (req, res) => {
  const { id } = req.params;
  mysqlCon.query('CALL get_songs_inAlbum(?)',
    [id], (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      return res.send(results[0]);
    });
});

// Get the top albums
albumRouter.get('/top', (req, res) => {
  mysqlCon.query('CALL get_top_ablums()', (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send(results[0]);
  });
});

// Post new data to albums
albumRouter.post('/api/albums', (req, res) => {
  const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
  const values = req.body.values.map((value) => `'${value}'`).join();
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  mysqlCon.query(`INSERT INTO \`albums\` (${collums}, uploaded_at) 
      VALUES (${values}, '${date}')`, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send('Uploaded new album');
  });
});

// Update albums data in the database
albumRouter.put('/:id', (req, res) => {
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

// Delete data from database
albumRouter.delete('/:id', (req, res) => {
  mysqlCon.query(`DELETE FROM \`albums\` 
    WHERE album_id =${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Deleted album');
    }
  });
});

module.exports = albumRouter;
