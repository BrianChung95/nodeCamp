const express = require("express");
const orderController = require("../controllers/order.controller");
const { checkJWT } = require("../middlewares/AuthorizationMiddleware");

const router = express.Router();

router.route('/order')
  .post(checkJWT, orderController.createOrder);

router.route('/order/:id')
  .get(checkJWT, orderController.getOrderById);

router.route('/order/:id/:operation')
  .patch(checkJWT, orderController.updateOrderById);

router.get("/orders", checkJWT, orderController.getOrdersByUserId);

module.exports = router;