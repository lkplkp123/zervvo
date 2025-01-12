const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Authorization token is required',
    });
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Invalid or expired token',
      });
    }

    req.user = decoded;
    next();
  });
};
