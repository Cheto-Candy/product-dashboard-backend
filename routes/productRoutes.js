const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts
} = require("../controllers/productController");

// 🔐 protected route (only logged-in users)
router.post("/", authMiddleware, createProduct);

// public route
router.get("/",authMiddleware, getProducts);

module.exports = router;