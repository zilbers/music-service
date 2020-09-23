const { Router } = require('express');
const mysqlCon = require('../modules/connections');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
  const { email, pass } = req.body;
  const query = `CALL music_service.login('${email}','${pass}')`;
  mysqlCon.query((query), (error, results, fields) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    return res.status(200).send(results[0][0]);
  });
});

module.exports = loginRouter;
