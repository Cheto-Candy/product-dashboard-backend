const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Unauthorized. Please login first."
    });
  }

  // attach user to request (like Django request.user)
  req.user = req.session.user;

  next();
};

module.exports = authMiddleware;