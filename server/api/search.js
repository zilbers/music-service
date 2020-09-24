const { Router } = require('express');

const searchRouter = Router();

// searchRouter.get('/', (req, res) => {
//   const { filter } = req.query;
//   const query = `SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at, songs.youtube_link
//     FROM music_service.songs
//     JOIN artists ON songs.artist_id = artists.artist_id
//     WHERE songs.title LIKE '${filter}%'`;
//   mysqlCon.query(query,
//     (error, results, fields) => {
//       if (error) {
//         return res.status(500).send(error.message);
//       }
//       return res.status(200).send(results);
//     });
// });

module.exports = searchRouter;
