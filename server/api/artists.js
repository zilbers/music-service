const { Router } = require('express');

const artistRouter = Router();

// // Get all from artists
// artistRouter.get('/', (req, res) => {
//   mysqlCon.query('CALL get_all_artists()', (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     return res.status(200).send(results[0]);
//   });
// });

// // Get by artist ID
// artistRouter.get('/artist_:id', async (req, res) => {
//   const { id } = req.params;
//   mysqlCon.query('CALL get_artist_byId(?)',
//     [id], (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return results[0][0] ? res.send(results[0]) : res.status(404).send('No playlist with this ID');
//     });
// });

// // Get the songs that are in the album
// artistRouter.get('/:id/list', async (req, res) => {
//   const { id } = req.params;
//   mysqlCon.query('CALL get_songs_ofArtist(?)',
//     [id], (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return res.send(results[0]);
//     });
// });

// // Get the top artists
// artistRouter.get('/top', (req, res) => {
//   mysqlCon.query('CALL get_top_artists()', (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     return res.status(200).send(results[0]);
//   });
// });

// // Post new data to artists
// artistRouter.post('/', (req, res) => {
//   const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
//   const values = req.body.values.map((value) => `'${value}'`).join();
//   const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

//   mysqlCon.query(`INSERT INTO \`artists\` (${collums}, uploaded_at)
//       VALUES (${values}, '${date}')`, (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     return res.status(200).send('Uploaded new artist');
//   });
// });

// // Update artist data in the database
// artistRouter.put('/:id', (req, res) => {
//   const collums = req.body.collums.map((collum) => `\`${collum}\``);
//   const values = req.body.values.map((value) => `'${value}'`);
//   const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

//   mysqlCon.query(`UPDATE \`artists\`
//     SET ${query}
//     WHERE artist_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     return res.status(200).send('Updated artist');
//   });
// });

// // Delete data from database
// artistRouter.delete('/:id', (req, res) => {
//   mysqlCon.query(`DELETE FROM \`artists\`
//     WHERE artist_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     return res.status(200).send('Deleted artist');
//   });
// });

module.exports = artistRouter;
