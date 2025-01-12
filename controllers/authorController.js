const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

exports.createAuthor = (req, res) => {
  const { name, biography } = req.body;

  authorModel.getAuthorByName(name, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Error checking author existence' });
    }

    if (results.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Author already exists' });
    }

    authorModel.createAuthor(name, biography, (err, results) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error creating author' });
      }
      res.status(201).json({ status: 'success', message: 'Author created' });
    });
  });
};

exports.getAuthors = (req, res) => {
  authorModel.getAuthors((err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Error fetching authors' });
    }

    const authorsWithBooks = [];
    results.forEach(row => {
      let author = authorsWithBooks.find(author => author.id === row.id);
      
      if (!author) {
        author = {
          id: row.id,
          name: row.name,
          biography: row.biography,
          books: []
        };
        authorsWithBooks.push(author);
      }
      
      if (row.book_id) {
        author.books.push({
          id: row.book_id,
          title: row.book_title,
          genre: row.book_genre
        });
      }
    });

    res.json({ status: 'success', data: authorsWithBooks });
  });
};


exports.getAuthorById = (req, res) => {
  const { id } = req.params;

  authorModel.getAuthorByIdWithBooks(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Author not found' });
    }

    const author = {
      id: results[0].id,
      name: results[0].name,
      biography: results[0].biography,
      books: []
    };

    results.forEach(result => {
      if (result.book_id) {
        author.books.push({
          id: result.book_id,
          title: result.book_title,
          genre: result.book_genre
        });
      }
    });

    res.json({ status: 'success', data: author });
  });
};






exports.updateAuthor = (req, res) => {
  const { id } = req.params;
  const { name, biography } = req.body;

  authorModel.updateAuthor(id, name, biography, (err, results) => {
    if (err || results.affectedRows === 0) {
      return res.status(400).json({ status: 'error', message: 'Error updating author' });
    }
    res.json({ status: 'success', message: 'Author updated' });
  });
};

exports.deleteAuthor = (req, res) => {
  const { id } = req.params;

  authorModel.deleteAuthor(id, (err, results) => {
    if (err || results.affectedRows === 0) {
      return res.status(400).json({ status: 'error', message: 'Error deleting author' });
    }
    res.json({ status: 'success', message: 'Author deleted' });
  });
};
