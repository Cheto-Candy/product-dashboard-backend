const { checkSchema, validationResult } = require("express-validator");
const RESPONSES = require("../utils/responses");
/**
 * Generic validation middleware
 * @param {Object} schema - validation schema
 */
const validateRequest = (schema) => {
  return [
    checkSchema(schema),

    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(RESPONSES.VALIDATION_ERROR.code).json(RESPONSES.VALIDATION_ERROR);
      }

      next();
    }
  ];
};

module.exports = validateRequest;