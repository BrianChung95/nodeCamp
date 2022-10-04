const express = require("express");
const cartController = require("../controllers/cart.controller");
const { checkJWT } = require("../middlewares/AuthorizationMiddleware")

const router = express.Router();

router.route('/cart/')
  .get(checkJWT, cartController.getCart);

router.route('/cart/:userId')
  .patch(checkJWT, cartController.updateCart);

module.exports = router;