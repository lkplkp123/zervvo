const { body, param } = require('express-validator');

const validateCreateAuthor = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('biography')
    .notEmpty().withMessage('Biography is required')
    .isString().withMessage('Biography must be a string'),
];

const validateUpdateAuthor = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isInt().withMessage('ID must be an integer'),
  body('name')
    .optional()
    .isString().withMessage('Name must be a string'),
  body('biography')
    .optional()
    .isString().withMessage('Biography must be a string'),
];

const validateDeleteAuthor = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isInt().withMessage('ID must be an integer'),
];

module.exports = {
  validateCreateAuthor,
  validateUpdateAuthor,
  validateDeleteAuthor,
};
