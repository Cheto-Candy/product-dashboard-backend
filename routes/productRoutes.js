const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validateRequest");

const authMiddleware = require("../middleware/authMiddleware");
// const  = require("../controllers/productController");
const controller = require("../controllers/productController");


const { productSchema } = require("../validators/productSchema");



// CRUD
router.post("/",validateRequest(productSchema), authMiddleware, controller.createProduct);
router.get("/",authMiddleware, controller.getProducts);
router.get("/:id",authMiddleware, controller.getProductById);
router.put("/:id",validateRequest(productSchema), authMiddleware, controller.updateProduct);
router.delete("/:id", authMiddleware, controller.deleteProduct);

// BULK DELETE (CHUNK)
router.delete("/bulk", authMiddleware, controller.deleteProductsInChunks);

module.exports = router;