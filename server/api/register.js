const { Router } = require('express');
const bcrypt = require('../modules/bcrypt');
const { User } = require('../models');

const registerRouter = Router();

registerRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPass = bcrypt.hash(password);
    await User.create({
      email,
      password: encryptedPass,
      isAdmin: false,
    });
    res.status(200).send('Registred!');
  } catch (e) {
    console.log(e);
  }
});

module.exports = registerRouter;
