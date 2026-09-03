const jwt = require('jsonwebtoken');

const studentAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ')
    ) {
      return res.status(401).json({
        success: false,
        message: 'Student authorization required'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.studentId = decoded.id;

    next();

  } catch (error) {
    console.error(
      'Student auth error:',
      error.message
    );

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired student token'
    });
  }
};

module.exports = studentAuth;