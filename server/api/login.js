const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('../modules/bcrypt');
const { User } = require('../models');

const loginRouter = Router();

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
    const token = jwt.sign({ email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' });
    return res.json({
      email,
      success: true,
      token,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = loginRouter;
