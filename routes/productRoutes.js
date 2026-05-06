const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validateRequest");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts
} = require("../controllers/productController");

const { productSchema } = require("../validators/productSchema");



// 🔐 protected route (only logged-in users)
router.post("/", validateRequest(productSchema), authMiddleware, createProduct);

// public route
router.get("/", authMiddleware, getProducts);

module.exports = router;