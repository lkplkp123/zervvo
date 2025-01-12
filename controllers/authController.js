const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  userModel.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Error checking user existence',
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'User already exists',
      });
    }

    userModel.createUser(username, email, password, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          code: 500,
          message: 'Error registering user',
        });
      }
      res.status(201).json({
        status: 'success',
        code: 201,
        message: 'User registered successfully',
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'User not found',
      });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username,email:user.email },
        'secretkey',  
        { expiresIn: '1h' }
      );

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Login successful',
        token: token,
      });
    });
  });
};
