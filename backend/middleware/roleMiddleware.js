const pool = require('../db'); // PostgreSQL connection pool

// Generic function to check role
const checkRole = async (req, res, next, allowedRole) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // Get user role from DB to ensure it's fresh
    const userQuery = await pool.query(
      'SELECT role FROM users WHERE user_id = $1',
      [req.user.user_id]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const userRole = userQuery.rows[0].role;

    if (userRole !== allowedRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${allowedRole} users can perform this action.`
      });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ success: false, message: 'Server error during authorization' });
  }
};

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

// Role-specific middlewares
const requireSuperAdmin = (req, res, next) => checkRole(req, res, next, 'super_admin');
const requireAdmin = (req, res, next) => checkRole(req, res, next, 'admin');
const requireOperator = (req, res, next) => checkRole(req, res, next, 'operator');

module.exports = {
  requireSuperAdmin,
  requireAdmin,
  requireOperator,
  requireReadAccess,
  requireWriteAccess,
};
