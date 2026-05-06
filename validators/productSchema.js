const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validateRequest");

const productSchema = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required"
    }
  },
  price: {
    in: ["body"],
    isFloat: {
      errorMessage: "Price must be a decimal number"
    },
    toFloat: true
  },
  description: {
    in: ["body"],
    optional: true
  }
};

module.exports = { productSchema };