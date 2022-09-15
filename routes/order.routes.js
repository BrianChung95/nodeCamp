const express = require("express");
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.route('/order')
  .post(orderController.createOrder);

router.route('/order/:id')
  .get(orderController.getOrderById);

module.exports = router;