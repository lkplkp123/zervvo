const db = require('../config/db');

const createBook = (title, author_id, genre, callback) => {
  const query = 'INSERT INTO books (title, author_id, genre) VALUES (?, ?, ?)';
  db.query(query, [title, author_id, genre], (err, results) => {
    callback(err, results);
  });
};

const getBooks = (callback) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, results) => {
    callback(err, results);
  });
};

const getBookByTitle = (title, callback) => {
  const query = 'SELECT * FROM books WHERE title = ?';
  db.query(query, [title], callback);
};


const getBooksByAuthorId = (author_id, callback) => {
  const query = 'SELECT * FROM books WHERE author_id = ?';
  db.query(query, [author_id], (err, results) => {
    callback(err, results);
  });
};

const getBooksByAuthor = (authorId, callback) => {
  const query = 'SELECT * FROM books WHERE author_id = ?';
  db.query(query, [authorId], (err, results) => {
    callback(err, results);
  });
};

const updateBook = (id, title, author_id, genre, callback) => {
  const query = 'UPDATE books SET title = ?, author_id = ?, genre = ? WHERE id = ?';
  db.query(query, [title, author_id, genre, id], (err, results) => {
    callback(err, results);
  });
};

const deleteBook = (id, callback) => {
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

module.exports = {
  createBook,
  getBooks,
  getBooksByAuthor,
  updateBook,
  deleteBook,
  getBookByTitle,
  getBooksByAuthorId
};
