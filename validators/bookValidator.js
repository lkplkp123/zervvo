const { body, param } = require('express-validator');

const validateCreateBook = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('author_id')
    .notEmpty().withMessage('Author ID is required')
    .isInt().withMessage('Author ID must be an integer'),
  body('genre')
    .notEmpty().withMessage('Genre is required')
    .isString().withMessage('Genre must be a string'),
];

const validateUpdateBook = [
  param('id')
    .notEmpty().withMessage('Book ID is required')
    .isInt().withMessage('Book ID must be an integer'),
  body('title')
    .optional()
    .isString().withMessage('Title must be a string'),
  body('author_id')
    .optional()
    .isInt().withMessage('Author ID must be an integer'),
  body('genre')
    .optional()
    .isString().withMessage('Genre must be a string'),
];

const validateDeleteBook = [
  param('id')
    .notEmpty().withMessage('Book ID is required')
    .isInt().withMessage('Book ID must be an integer'),
];

module.exports = {
  validateCreateBook,
  validateUpdateBook,
  validateDeleteBook,
};
