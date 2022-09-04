const express = require("express");
const router = express.Router();

//controllers
const {
  addItemsToCart,
  getAllCartItems,
  removeCartItems,
} = require("../controllers/cart.controller");

router.get("/cart", getAllCartItems);

router.post("/cartItem/:productId", addItemsToCart);

router.delete("/cartItem/:productId", removeCartItems);

module.exports = router;
