const express = require("express");
const productController = require('../controllers/products.controller');

const router = express.Router();

router.route('/').get(productController.getAllProducts);
router.route('/c/:categoryId').get(productController.getProductsByCategory);
router.route('/p/:productId').get(productController.getProductById);

module.exports = router;