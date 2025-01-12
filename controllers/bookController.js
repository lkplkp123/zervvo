const bookModel = require('../models/bookModel');

exports.createBook = (req, res) => {
  const { title, author_id, genre } = req.body;

  bookModel.getBookByTitle(title, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Error checking book existence' });
    }

    if (results.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Book with this title already exists' });
    }

    bookModel.createBook(title, author_id, genre, (err, results) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error creating book' });
      }
      res.status(201).json({ status: 'success', message: 'Book created' });
    });
  });
};

exports.getBooks = (req, res) => {
  bookModel.getBooks((err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Error fetching books' });
    }
    res.json({ status: 'success', data: results });
  });
};

exports.getBooksByAuthor = (req, res) => {
  const { authorId } = req.params;

  bookModel.getBooksByAuthor(authorId, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No books found for this author' });
    }
    res.json({ status: 'success', data: results });
  });
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author_id, genre } = req.body;

  bookModel.updateBook(id, title, author_id, genre, (err, results) => {
    if (err || results.affectedRows === 0) {
      return res.status(400).json({ status: 'error', message: 'Error updating book' });
    }
    res.json({ status: 'success', message: 'Book updated' });
  });
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;

  bookModel.deleteBook(id, (err, results) => {
    if (err || results.affectedRows === 0) {
      console.log(err,"err")
      return res.status(400).json({ status: 'error', message: 'Error deleting book' });
    }
    res.json({ status: 'success', message: 'Book deleted' });
  });
};
