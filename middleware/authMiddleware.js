const RESPONSES = require("../utils/responses");

const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(RESPONSES.INVALID_CREDENTIALS.code).json(RESPONSES.INVALID_CREDENTIALS);
  }

  // attach user to request (like Django request.user)
  req.user = req.session.user;

  next();
};

module.exports = authMiddleware;