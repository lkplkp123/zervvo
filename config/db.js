const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Change as necessary
  password: '',  // Change as necessary
  database: 'bookstore'
});

module.exports = db;
