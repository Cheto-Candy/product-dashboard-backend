const Product = require("../models/productModel");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

module.exports = { createProduct, getProducts };