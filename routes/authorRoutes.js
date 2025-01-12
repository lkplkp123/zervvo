const express = require('express');
const authorController = require('../controllers/authorController');

const authMiddleware = require('../middleware/authMiddleware');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');
const {
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor,
  } = require('../validators/authorValidator');
  const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();


router.post('/authors',validateCreateAuthor,validationErrorHandler,authMiddleware, rateLimitMiddleware, authorController.createAuthor);

router.get('/authors',authMiddleware, rateLimitMiddleware, authorController.getAuthors);

router.get('/authors/:id',authMiddleware, rateLimitMiddleware, authorController.getAuthorById);

router.put('/authors/:id',validateUpdateAuthor,validationErrorHandler,authMiddleware, rateLimitMiddleware, authorController.updateAuthor);

router.delete('/authors/:id',validateDeleteAuthor,validationErrorHandler,authMiddleware, rateLimitMiddleware, authorController.deleteAuthor);

module.exports = router;
