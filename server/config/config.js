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
    port: process.env.MYSQL_PORT || 3306,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_TEST,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: 'mysql',
    define: { underscore: true },
    logging: false,
    port: process.env.MYSQL_PORT || 3306,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: 'database_production',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    port: process.env.MYSQL_PORT || 3306,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
  },
};
