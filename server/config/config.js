require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: 'mysql',
    define: { underscore: true },
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_TEST,
    host: process.env.HOST || '127.0.0.1',
    dialect: 'mysql',
    define: { underscore: true },
    logging: false,
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: 'database_production',
    host: process.env.HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
