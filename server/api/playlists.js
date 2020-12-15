/* eslint-disable camelcase */
const { Router } = require("express");
const { Sequelize } = require("sequelize");
const {
  Playlist,
  Song,
  Artist,
  Playlist_song,
  User_playlist,
} = require("../models");

const playlistRouter = Router();

// Get all artists
playlistRouter.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get by playlist ID
playlistRouter.get("/playlist_:id", async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findAll({
      where: {
        id,
      },
    });
    res.json(playlist);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get songs that are in the playlist
playlistRouter.get("/:id/list", async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findByPk(id);
    const songList = await Playlist_song.findAll({
      where: [{ playlist_id: id }],
      attributes: ["song_id"],
      include: [
        {
          model: Song,
          include: [
            {
              model: Artist,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    res.json({ playlist, songList });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the top playlists
playlistRouter.get("/top", async (req, res) => {
  try {
    const topPlaylists = await User_playlist.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("user_id")), "likes"]],
      include: [
        {
          model: Playlist,
          attributes: ["name", "cover_img", "id"],
        },
      ],
      order: [["playlist_id", "ASC"]],
      group: ["playlist_id"],
    });
    res.json(topPlaylists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Post new playlist
playlistRouter.post("/", async (req, res) => {
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => {
    query[collum] = values[index];
  });

  try {
    await Playlist.create(query);
    res.status(200).send("Posted new playlist");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get the liked playlists
playlistRouter.get("/liked/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const likedPlaylist = await User_playlist.findAll({
      attributes: [["playlist_id", "id"]],
      include: [
        {
          model: Playlist,
          attributes: ["name", "id", "cover_img"],
        },
      ],
      where: {
        userId: id,
      },
    });
    res.json(likedPlaylist);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Like playlist
playlistRouter.post("/like", async (req, res) => {
  try {
    const { userId, songId } = req.body;
    await User_playlist.create({
      userId,
      playlistId: songId,
    });
    res.status(200).send("Liked playlist");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Update albums data in the database
playlistRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { values, collums } = req.body;
  const query = {};

  collums.forEach((collum, index) => {
    query[collum] = values[index];
  });

  try {
    await Playlist.update(query, {
      where: {
        id,
      },
    });
    res.status(200).send("Updated playlist");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// // Delete artist from database
playlistRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Playlist.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Deleted playlist");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = playlistRouter;
