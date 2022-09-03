const express = require("express");
const router = express.Router();

//controllers
const {
  addItemToCart,
  getAllCartItems,
  removeCartItems,
} = require("../controllers/cart.controller");

router.get("/cart", getAllCartItems);

router.post(
  "/cartItem/:productId",
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.delete(
  "/cartItem/:productId",
  requireSignin,
  userMiddleware,
  removeCartItems
);

module.exports = router;
