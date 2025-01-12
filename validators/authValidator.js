const { body } = require('express-validator');

const validateRegister = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = {
  validateRegister,
  validateLogin,
};
