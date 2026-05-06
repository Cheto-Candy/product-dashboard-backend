const RESPONSES = {
  USER_NOT_FOUND: {
    message: "User not found",
    code: 404
  },

  INVALID_CREDENTIALS: {
    message: "Invalid email or password",
    code: 401
  },

  USER_CREATED: {
    message: "User created successfully",
    code: 201
  },

  PRODUCT_CREATED: {
    message: "Product created successfully",
    code: 201
  },

  VALIDATION_ERROR: {
    message: "Validation failed",
    code: 400
  },

  SERVER_ERROR: {
    message: "Internal server error",
    code: 500
  }
};

module.exports = RESPONSES;