/* eslint-disable camelcase */
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const {
  Album, Song, Artist, User_album,
} = require('../models');

const albumRouter = Router();

// Get albums
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
    const album = await Album.findByPk(id);
    res.json(album);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the songs that are in the album
albumRouter.get('/:id/list', async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findByPk(id);
    console.log(album);
    const songs = await album.getSongs();
    console.log(songs);
    res.json({ album, songs });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top albums
albumRouter.get('/top', async (req, res) => {
  try {
    const topAlbums = await User_album.findAll({
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
        ['user_id', 'ASC'],
      ],
      group: ['album_id'],
      raw: true,
    });
    res.json(topAlbums);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Post new albums
albumRouter.post('/', async (req, res) => {
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    await Album.create(query);
    res.status(200).send('Posted new album');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Update albums data in the database
albumRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { values, collums } = req.body;
  const query = {};
  collums.forEach((collum, index) => { query[collum] = values[index]; });
  query.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    await Album.update(query, {
      where: {
        id,
      },
    });
    res.status(200).send('Updated album');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Delete album from database
albumRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Album.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Deleted album');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = albumRouter;
