const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { getCartByUserId, addItems, deleteItems } = require("../service");

const getAllCartItems = catchAsync((req, res) => {
  const cart = await getCartByUserId(req.user._id);
  return cart;
});

const addItemToCart = catchAsync((req, res) => {
  const cart = await getCartByUserId(req.user._id);
});

const removeCartItems = catchAsync((req, res) => {});

module.exports = { addItemToCart, getAllCartItems, removeCartItems };
