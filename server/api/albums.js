/* eslint-disable camelcase */
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const {
  Album, Song, Artist, User_album,
} = require('../models');

const albumRouter = Router();

// Get all from albums
albumRouter.get('/', async (req, res) => {
  try {
    const allAlbums = await Album.findAll();
    res.json(allAlbums);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get by albums ID
albumRouter.get('/album_:id', async (req, res) => {
  const { id } = req.params;
  try {
    const allAlbums = await Album.findByPk(id);
    res.json(allAlbums);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the songs that are in the album
albumRouter.get('/:id/list', async (req, res) => {
  const { id } = req.params;
  try {
    const allAlbums = await Album.findByPk(id, {
      include: [
        {
          model: Artist,
          attributes: ['name'],
        },
        {
          model: Song,
        },
      ],
    });
    res.json(allAlbums);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top albums
albumRouter.get('/top', async (req, res) => {
  try {
    const allAlbums = await User_album.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'likes']],
      include: [
        {
          model: Album,
          attributes: ['name', 'cover_img'],
          include: {
            model: Artist,
            attributes: ['name'],
          },
        },
      ],
      order: [
        ['album_id', 'ASC'],
      ],
      group: ['album_id'],
      raw: true,
    });
    res.json(allAlbums);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Post new data to albums
albumRouter.post('/', async (req, res) => {
  const { values, collums } = req.body;
  const query = {};
  collums.forEach((collum, index) => { query[collum] = values[index]; });
  query.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    await Album.create(query);
    res.status(200).send('Posted new album');
  } catch (e) {
    res.status(500).send(e.message);
  }

  // mysqlCon.query(`INSERT INTO \`albums\` (${collums}, uploaded_at)
  //     VALUES (${values}, '${date}')`, (error, results, fields) => {
  //   if (error) {
  //     return res.status(500).send(error.message);
  //   }
  //   res.status(200).send('Uploaded new album');
  // });
});

// // Update albums data in the database
// albumRouter.put('/:id', (req, res) => {
//   const collums = req.body.collums.map((collum) => `\`${collum}\``);
//   const values = req.body.values.map((value) => `'${value}'`);
//   const query = collums.map((collum, index) => `${collum} = ${values[index]}`).join();

//   mysqlCon.query(`UPDATE \`albums\`.\`${req.params.table}\`
//     SET ${query}
//     WHERE album_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(200).send('Updated album');
//     }
//   });
// });

// // Delete data from database
// albumRouter.delete('/:id', (req, res) => {
//   mysqlCon.query(`DELETE FROM \`albums\`
//     WHERE album_id =${req.params.id}`, (error, results, fields) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(200).send('Deleted album');
//     }
//   });
// });

module.exports = albumRouter;
