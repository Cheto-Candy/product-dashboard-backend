const Product = require("../models/productModel");
const { RESPONSES } = require("../utils/responses");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(RESPONSES.VALIDATION_ERROR.code).json(RESPONSES.VALIDATION_ERROR);
    }

    const product = await Product.create({
      name,
      price,
      description,
    });

    res.status(RESPONSES.PRODUCT_CREATED.code).json(RESPONSES.PRODUCT_CREATED);

  } catch (error) {
    res.status(RESPONSES.SERVER_ERROR.code).json(RESPONSES.SERVER_ERROR);
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

module.exports = { createProduct, getProducts };