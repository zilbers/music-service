const { Router } = require('express');
const { Op } = require('sequelize');
const { Song } = require('../models');

const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
  const { filter } = req.query;
  try {
    const filteredSongs = await Song.findAll({
      where: {
        name: {
          [Op.like]: `${filter}%`,
        },
      },
    });
    res.json(filteredSongs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = searchRouter;
