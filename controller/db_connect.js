const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'brand_test'
});

module.exports = connection;