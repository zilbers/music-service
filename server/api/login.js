const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const loginRouter = Router();

// Post new albums
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      return res.status(403).json({
        errorMessage: 'wrong login credentials',
      });
    }
    const token = jwt.sign({ email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' });
    return res.json({
      success: true,
      token,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = loginRouter;
