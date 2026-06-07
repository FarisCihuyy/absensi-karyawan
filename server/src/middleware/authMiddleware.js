const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/AppError');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
};

module.exports = verifyToken;
