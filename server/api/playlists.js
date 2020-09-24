const { Router } = require('express');

const playlisthRouter = Router();

// // Get all from playlists
// playlisthRouter.get('/', (req, res) => {
//   mysqlCon.query('CALL get_all_playlists()',
//     (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return res.status(200).send(results[0]);
//     });
// });

// // Get by playlists ID
// playlisthRouter.get('/playlist_:id', async (req, res) => {
//   const { id } = req.params;
//   mysqlCon.query('CALL get_playlists_byId(?)',
//     [id], (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return results[0][0] ? res.send(results[0]) : res.status(404).send('No playlist with this ID');
//     });
// });

// // Get the songs that are in the playlist
// playlisthRouter.get('/:id/list', async (req, res) => {
//   const { id } = req.params;
//   mysqlCon.query('CALL get_songs_inPlaylist(?)',
//     [id], (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return res.send(results[0]);
//     });
// });

// // Get the top playlists
// playlisthRouter.get('/top', (req, res) => {
//   mysqlCon.query('CALL get_top_playlists()', (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     res.status(200).send(results[0]);
//   });
// });

// // Post new data to playlists
// playlisthRouter.post('/', (req, res) => {
//   const collums = req.body.collums.map((collum) => `\`${collum}\``).join();
//   const values = req.body.values.map((value) => `'${value}'`).join();
//   const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

//   mysqlCon.query(`INSERT INTO \`playlists\` (${collums}, uploaded_at)
//     VALUES (${values}, '${date}')`, (error, results, fields) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     }
//     res.status(200).send('Uploaded new playlist');
//   });
// });

// // Update playlist data in the database
// playlisthRouter.put('/:id', (req, res) => {
//   const collums = req.body.collums.map((collum) => `\`${collum}\``);
//   const values = req.body.values.map((value) => `'${value}'`);
//   const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

//   mysqlCon.query(`UPDATE \`playlists\`
//   SET ${query}
//   WHERE playlist_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(200).send('Updated playlist');
//     }
//   });
// });

// // Delete data from database
// playlisthRouter.delete('/:id', (req, res) => {
//   mysqlCon.query(`DELETE FROM \`playlists\`
//   WHERE playlist_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(200).send('Deleted playlist');
//     }
//   });
// });

module.exports = playlisthRouter;
