const { Router } = require('express');
const { User } = require('../models');

const loginRouter = Router();

// Post new albums
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  //   collums.forEach((collum, index) => { query[collum] = values[index]; });

  try {
    const logIn = await User.findAll({
      where: {
        email,
        password,
      },
    });
    res.status(200).send(!!logIn[0]);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = loginRouter;
