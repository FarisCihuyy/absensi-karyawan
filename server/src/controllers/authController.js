const { login } = require('../services/authService');
const { loginSchema } = require('../validators/schemas');
const asyncHandler = require('../middleware/asyncHandler');

const loginController = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    throw error;
  }

  const result = await login(value.username, value.password);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

module.exports = {
  loginController,
};
