const { AppError } = require('../errors/AppError');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: err.details.map(d => ({
        path: d.path.join('.'),
        message: d.message,
      })),
    });
  }

  // Handle database errors
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed',
    });
  }

  // Generic error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
};

module.exports = errorHandler;
