const express = require("express");
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.route('/order')
  .post(orderController.createOrder);

router.route('/order/:id')
  .get(orderController.getOrderById);

router.route('/order/:id/:operation')
  .patch(orderController.updateOrderById);

router.route('/orders/:userId')
  .get(orderController.getOrdersByUserId);

module.exports = router;