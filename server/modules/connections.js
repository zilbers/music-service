const mysql = require('mysql');
require('dotenv').config();

const { database, password, user } = process.env;

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user,
  password,
  database,
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySql!');
});

module.exports = mysqlCon;
