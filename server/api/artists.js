/* eslint-disable camelcase */
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const {
  Song, Artist, User_artist,
} = require('../models');

const artistRouter = Router();

// Get all artists
artistRouter.get('/', async (req, res) => {
  try {
    const allArtists = await Artist.findAll();
    res.json(allArtists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get by artist ID
artistRouter.get('/artist_:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findAll({
      where: {
        id,
      },
    });
    res.json(artist);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// // Get songs by artist
artistRouter.get('/:id/list', async (req, res) => {
  const { id } = req.params;
  try {
    const allAlbums = await Artist.findByPk(id, {
      include: [
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

// Get the top artists
artistRouter.get('/top', async (req, res) => {
  try {
    const topArtists = await User_artist.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'likes']],
      include: [
        {
          model: Artist,
          attributes: ['name', 'cover_img', 'id'],
        },
      ],
      order: [
        ['artist_id', 'ASC'],
      ],
      group: ['artist_id'],
    });
    res.json(topArtists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the liked playlists
artistRouter.get('/liked/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const likedArtists = await User_artist.findAll({
      attributes: [['artist_id', 'id']],
      include: [
        {
          model: Artist,
          attributes: ['name', 'id', 'cover_img'],
        },
      ],
      where: {
        userId: id,
      },
    });
    res.json(likedArtists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Like artist
artistRouter.post('/like', async (req, res) => {
  try {
    const { userId, songId } = req.body;
    await User_artist.create({
      userId,
      artistId: songId,
    });
    res.status(200).send('Liked artist');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Post new artist
artistRouter.post('/', async (req, res) => {
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    await Artist.create(query);
    res.status(200).send('Posted new artist');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Update albums data in the database
artistRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    await Artist.update(query, {
      where: {
        id,
      },
    });
    res.status(200).send('Updated artist');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// // Delete artist from database
artistRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Artist.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Deleted artist');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = artistRouter;
