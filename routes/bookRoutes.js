const express = require('express');
const bookController = require('../controllers/bookController');

const authMiddleware = require('../middleware/authMiddleware');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');
const {
    validateCreateBook,
    validateUpdateBook,
    validateDeleteBook,
  } = require('../validators/bookValidator');
  const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();

router.post('/books',validateCreateBook,validationErrorHandler,authMiddleware, rateLimitMiddleware, bookController.createBook);

router.get('/books',authMiddleware, rateLimitMiddleware, bookController.getBooks);

router.get('/books/author/:authorId',authMiddleware, rateLimitMiddleware, bookController.getBooksByAuthor);

router.put('/books/:id',validateUpdateBook,validationErrorHandler,authMiddleware, rateLimitMiddleware, bookController.updateBook);

router.delete('/books/:id',validateDeleteBook,validationErrorHandler,authMiddleware, rateLimitMiddleware, bookController.deleteBook);


module.exports = router;
