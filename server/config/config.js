require('dotenv').config();

const { database, password, username } = process.env;

module.exports = {
  development: {
    username: 'root',
    password,
    database,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: { underscore: true },
  },
  test: {
    username: 'root',
    password,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
