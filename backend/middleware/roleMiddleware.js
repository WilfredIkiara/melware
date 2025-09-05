const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
};

// Specific role middlewares
const requireSuperAdmin = authorizeRole('superadmin');
const requireAdmin = authorizeRole('admin', 'superadmin');
const requireOperator = authorizeRole('operator', 'admin', 'superadmin');

// Permission-based middleware
const requireReadAccess = authorizeRole('operator', 'admin', 'superadmin');
const requireWriteAccess = authorizeRole('admin', 'superadmin');
const requireFullAccess = authorizeRole('superadmin');

module.exports = {
  authorizeRole,
  requireSuperAdmin,
  requireAdmin,
  requireOperator,
  requireReadAccess,
  requireWriteAccess,
  requireFullAccess
};