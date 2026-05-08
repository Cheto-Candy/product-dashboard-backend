// const Product = require("../models/productModel");
// const { RESPONSES } = require("../utils/responses");

// // CREATE PRODUCT
// const createProduct = async (req, res) => {
//   try {
//     const { name, price, description } = req.body;

//     if (!name || !price) {
//       return res.status(RESPONSES.VALIDATION_ERROR.code).json(RESPONSES.VALIDATION_ERROR);
//     }

//     const product = await Product.create({
//       name,
//       price,
//       description,
//     });

//     res.status(RESPONSES.PRODUCT_CREATED.code).json(RESPONSES.PRODUCT_CREATED);

//   } catch (error) {
//     res.status(RESPONSES.SERVER_ERROR.code).json(RESPONSES.SERVER_ERROR);
//   }
// };

// // GET ALL PRODUCTS
// const getProducts = async (req, res) => {
//   const products = await Product.findAll();
//   res.json(products);
// };

// module.exports = { createProduct, getProducts };


const Product = require("../models/productModel");
const { RESPONSES } = require("../utils/responses");


// ========================
// CREATE PRODUCT
// ========================
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res
        .status(RESPONSES.VALIDATION_ERROR.code)
        .json(RESPONSES.VALIDATION_ERROR);
    }

    const product = await Product.create({
      name,
      price,
      description,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// GET ALL PRODUCTS
// ========================
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.json({
      success: true,
      data: products,
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// GET SINGLE PRODUCT
// ========================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res
        .status(RESPONSES.USER_NOT_FOUND.code)
        .json({
          ...RESPONSES.USER_NOT_FOUND,
          message: "Product not found",
        });
    }

    return res.json({
      success: true,
      data: product,
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// UPDATE PRODUCT
// ========================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(RESPONSES.USER_NOT_FOUND.code).json({
        ...RESPONSES.USER_NOT_FOUND,
        message: "Product not found",
      });
    }

    await product.update(req.body);

    return res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// DELETE SINGLE PRODUCT
// ========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(RESPONSES.USER_NOT_FOUND.code).json({
        ...RESPONSES.USER_NOT_FOUND,
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// BULK DELETE (CHUNK DELETE)
// ========================
// DELETE /products/bulk?ids=1,2,3
const deleteProductsInChunks = async (req, res) => {
  try {
    const ids = req.query.ids?.split(",");

    if (!ids || ids.length === 0) {
      return res.status(RESPONSES.VALIDATION_ERROR.code).json({
        success: false,
        message: "No product IDs provided",
      });
    }

    const deleted = await Product.destroy({
      where: {
        id: ids,
      },
    });

    return res.json({
      success: true,
      message: `${deleted} products deleted`,
    });

  } catch (error) {
    return res
      .status(RESPONSES.SERVER_ERROR.code)
      .json(RESPONSES.SERVER_ERROR);
  }
};


// ========================
// EXPORT
// ========================
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductsInChunks,
};