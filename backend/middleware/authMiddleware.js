// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required',
      error: 'MISSING_TOKEN'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      let errorMessage = 'Invalid token';
      let errorType = 'INVALID_TOKEN';
      let statusCode = 403;
      
      // Check specifically for token expiration
      if (err.name === 'TokenExpiredError') {
        errorMessage = 'Token has expired';
        errorType = 'TOKEN_EXPIRED';
        statusCode = 401; // 401 is more appropriate for expired tokens
      } 
      // Check for other specific JWT errors
      else if (err.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token signature';
        errorType = 'INVALID_SIGNATURE';
      } else if (err.name === 'NotBeforeError') {
        errorMessage = 'Token not yet active';
        errorType = 'TOKEN_NOT_ACTIVE';
      }
      
      return res.status(statusCode).json({ 
        success: false,
        message: errorMessage,
        error: errorType,
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Add token expiration information to the request
    const now = Math.floor(Date.now() / 1000);
    req.user = user;
    req.tokenExpiresIn = user.exp - now; // Seconds until expiration
    
    next();
  });
};

// Optional: Middleware to check if token will expire soon
const checkTokenExpirySoon = (req, res, next) => {
  if (req.tokenExpiresIn < 300) { // 5 minutes or less
    res.set('X-Token-Expiring-Soon', 'true');
    res.set('X-Token-Expires-In', req.tokenExpiresIn.toString());
  }
  next();
};

// Optional: Middleware to refresh tokens (would need a refresh token system)
const refreshTokenIfNeeded = async (req, res, next) => {
  // This is a placeholder for a refresh token mechanism
  // You would need to implement a refresh token system separately
  next();
};
// middleware/roleMiddleware.js

// Users allowed to read
const requireReadAccess = (req, res, next) => {
  if (['admin', 'operator', 'super-admin'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Read access denied',
    error: 'READ_ACCESS_DENIED'
  });
};

// Users allowed to write
const requireWriteAccess = (req, res, next) => {
  if (['admin', 'super-admin'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Write access denied',
    error: 'WRITE_ACCESS_DENIED'
  });
};


module.exports = { 
  requireReadAccess,
   requireWriteAccess,
  authenticateToken, 
  checkTokenExpirySoon,
  refreshTokenIfNeeded 
};