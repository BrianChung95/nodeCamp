const express = require("express");
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.route('/order')
  .post(orderController.createOrder);

module.exports = router;