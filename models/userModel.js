const db = require('../config/db');
const bcrypt = require('bcryptjs');

const findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    callback(err, results);
  });
};

const createUser = (username, email, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
      callback(err, results);
    });
  });
};

module.exports = {
  findByEmail,
  createUser
};
