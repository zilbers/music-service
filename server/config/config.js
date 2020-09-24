require('dotenv').config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: { underscore: true },
  },
  test: {
    username: process.env.username,
    password: process.env.password,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.username,
    password: process.env.password,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
