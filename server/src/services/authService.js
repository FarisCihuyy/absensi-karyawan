const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { UnauthorizedError } = require('../errors/AppError');

const generateTokens = (userId, username) => {
  const accessToken = jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1h' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );

  return { accessToken, refreshToken };
};

const login = async (username, password) => {
  const query = 'SELECT id, username, password FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);

  if (result.rows.length === 0) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const { accessToken, refreshToken } = generateTokens(user.id, user.username);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};

module.exports = {
  login,
  generateTokens,
};
