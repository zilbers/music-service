const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
module.exports = app;
let requestID = 0;

function logger(req, res, next) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`,
  );
  requestID += 1;
  next();
}

app.use(logger);
app.use(express.json());

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  database: 'music_service',
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySql!');
});

// Get all
app.get('/api/:table', (req, res) => {
  console.log(req.params.table);
  const { table } = req.params;
  mysqlCon.query(`SELECT * FROM ${table}`, (error, results, fields) => {
    if (error) {
      res.status(500).send(error.message);
    }
    res.send(results);
  });
});

// Get by ID
app.get('/api/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  mysqlCon.query(`SELECT * FROM ${table} WHERE ${table.slice(0, -1)}_id = ?`,
    [id], (error, results, fields) => {
      if (error) {
        res.status(500).send(error.message);
        throw error;
      }
      results[0] ? res.send(results) : res.status(404).send(`No ${req.params.table} with this ID`);
    });
});
