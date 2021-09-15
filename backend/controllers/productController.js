import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc   : fetch all products
//@route  : GET /api/products
//@access : Public Route
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc   : fetch a product by id
//@route  : GET /api/products/:id
//@access : Public Route
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
