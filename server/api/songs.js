/* eslint-disable camelcase */
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const {
  Album, Song, Artist, User_song,
} = require('../models');

const songsRouter = Router();

// Get all songs
songsRouter.get('/', async (req, res) => {
  try {
    const allSongs = await Song.findAll();
    res.json(allSongs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get by songs ID
songsRouter.get('/song_:id', async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByPk(id);
    res.json(song);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top songs
songsRouter.get('/top', async (req, res) => {
  try {
    const topSongs = await User_song.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'likes']],
      include: [
        {
          model: Song,
          attributes: ['name'],
          include: {
            model: Artist,
            attributes: ['name'],
          },
        },
      ],
      order: [
        ['user_id', 'ASC'],
      ],
      group: ['song_id'],
      raw: true,
    });
    res.json(topSongs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top songs
songsRouter.get('/liked/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const topSongs = await User_song.findAll({
      attributes: ['song_id'],
      include: [
        {
          model: Song,
          attributes: ['name'],
          include: {
            model: Artist,
            attributes: ['name'],
          },
        },
      ],
      where: {
        userId: id,
      },
      raw: true,
    });
    res.json(topSongs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top songs
songsRouter.post('/like', async (req, res) => {
  try {
    const { userId, songId } = req.body;
    await User_song.create({
      userId,
      songId,
    });
    res.status(200).send('Liked song');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Post new song
songsRouter.post('/', async (req, res) => {
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    await Song.create(query);
    res.status(200).send('Posted new song');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Update albums data in the database
songsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { values, collums } = req.body;
  const query = {};
  collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    await Song.update(query, {
      where: {
        id,
      },
    });
    res.status(200).send('Updated song');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Delete album from database
songsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Song.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Deleted song');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = songsRouter;

// // Like song
// songsRouter.post('/like', async (req, res) => {
//   const { user_id, song_id } = req.body;
//   mysqlCon.query('CALL like_song(?,?)',
//     [user_id, song_id], (error, results, fields) => {
//       if (error) {
//         mysqlCon.query('CALL remove_likeSong(?,?)',
//           [user_id, song_id], (err1, res1, fields) => {
//             if (err1) {
//               return res.status(500).send('Error with action');
//             }
//             console.log('remove like');
//             return res.send(res1[0]);
//           });
//       } else {
//         return res.send(results[0]);
//       }
//     });
// });
