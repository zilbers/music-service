const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('../modules/bcrypt');
// const { readFileSync, writeFileSync } = require('fs');
const { User } = require('../models');
// const {
//   User,
//   Album,
//   Artist,
//   Playlist_song,
//   Playlist,
//   Song,
//   User_album,
//   User_artist,
//   User_playlist,
//   User_song,
// } = require('../models');

const loginRouter = Router();

// const models = [
//   User,
//   Album,
//   Artist,
//   Playlist_song,
//   Playlist,
//   Song,
//   User_album,
//   User_artist,
//   User_playlist,
//   User_song,
// ];

// const modelsNames = [
//   'User',
//   'Album',
//   'Artist',
//   'Playlist_song',
//   'Playlist',
//   'Song',
//   'User_album',
//   'User_artist',
//   'User_playlist',
//   'User_song',
// ];

// const path = '../';

// loginRouter.get('/getall', async (req, res) => {
//   try {
//     const resultsArr = [];
//     for (let index = 0; index < models.length; index += 1) {
//       try {
//         const result = await models[index].findAll();
//         resultsArr.push(result);
//         writeFileSync(
//           path + modelsNames[index] + '.js',
//           `module.exports = ${JSON.stringify(result)}`
//         );
//       } catch (e) {
//         console.log(modelsNames[index], e.message);
//       }
//     }
//     res.send(resultsArr);
//     // res.json(resultsArr);
//   } catch (e) {
//     res.send(e);
//   }
// });

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const check = bcrypt.compare(password, user.password);
    if (!user || !check) {
      return res.status(403).json({
        errorMessage: 'Wrong login credentials',
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return res.json({
      email,
      id: user.id,
      success: true,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
});

module.exports = loginRouter;
