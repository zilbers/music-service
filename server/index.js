const app = require('./app');
require('dotenv').config();

const { PORT } = process.env;
app.listen(
  PORT,
  console.log(`Music Service is running at http://localhost:${PORT}`)
);
