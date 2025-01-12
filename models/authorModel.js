const db = require('../config/db');

const createAuthor = (name, biography, callback) => {
  const query = 'INSERT INTO authors (name, biography) VALUES (?, ?)';
  db.query(query, [name, biography], (err, results) => {
    callback(err, results);
  });
};


const getAuthorByName = (name, callback) => {
  const query = 'SELECT * FROM authors WHERE name = ?';
  db.query(query, [name], (err, results) => {
    callback(err, results);
  });
};

const getAuthors = (callback) => {
  const query = `
    SELECT authors.id, authors.name, authors.biography, books.id AS book_id, books.title AS book_title, books.genre AS book_genre
    FROM authors
    LEFT JOIN books ON authors.id = books.author_id
  `;
  db.query(query, (err, results) => {
    callback(err, results);
  });
};


const getAuthorByIdWithBooks = (id, callback) => {
  const query = `
    SELECT authors.*, books.id AS book_id, books.title AS book_title, books.genre AS book_genre
    FROM authors
    LEFT JOIN books ON authors.id = books.author_id
    WHERE authors.id = ?
  `;
  
  db.query(query, [id], (err, results) => {
    callback(err, results);
  });
};




const updateAuthor = (id, name, biography, callback) => {
  const query = 'UPDATE authors SET name = ?, biography = ? WHERE id = ?';
  db.query(query, [name, biography, id], (err, results) => {
    callback(err, results);
  });
};

const deleteAuthor = (id, callback) => {
  const query = 'DELETE FROM authors WHERE id = ?';
  db.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

module.exports = {
  createAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
  getAuthorByIdWithBooks
};
