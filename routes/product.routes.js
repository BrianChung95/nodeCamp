const express = require("express");
const productController = require('../controllers/products.controller');

const router = express.Router();

// router.route('/categories').get(productController.getAllCategories);
// router.route('/products')
//   .get(productController.getAllProducts);

router.route('/products-and-categories/')
  .get(productController.getAllProductsAndAllCategories);

router.route('/products/:cateId?')
  .get(productController.getProductsByCategory);

router.route('/product/:id')
  .get(productController.getProductById);

router.route('/product')
  .post(productController.createProduct);

module.exports = router;