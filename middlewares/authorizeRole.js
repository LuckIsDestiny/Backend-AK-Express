const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!Array.isArray(allowedRoles)) {
        allowedRoles = [allowedRoles];
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied: insufficient role' });
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
