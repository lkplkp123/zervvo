const express = require('express');
const { register, login } = require('../controllers/authController');
const {
    validateRegister,
    validateLogin,
} = require('../validators/authValidator');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();

router.post(
    '/register',
    validateRegister,
    validationErrorHandler,
    register);

router.post(
    '/login',
    validateLogin,
    validationErrorHandler,
    login);

module.exports = router;
