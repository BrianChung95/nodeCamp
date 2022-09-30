const express = require("express");
const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.route('/cart/:userId')
  .get(cartController.getCart);

router.route('/cart/:userId')
  .patch(cartController.updateCart);

module.exports = router;