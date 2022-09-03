const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { cartService, productService } = require("../services");

const getAllCartItems = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUserId(req.user._id);
  return cart;
});

const addItemsToCart = catchAsync(async (req, res) => {
  const { user, items, quantity } = req;
  const cart = await cartService.getCartByUserId(user._id);
  const itemsToBeAdded = await productService.getProductById(items.productId);
  const newCart = await cartService.addItemsToUserCart(
    cart,
    itemsToBeAdded,
    quantity
  );
  console.log(user, newCart);
  res.status(httpStatus.OK).send({ user, cart: newCart });
});

const removeCartItems = catchAsync(async (req, res) => {
  const { user, items, quantity } = req;
  const cart = await cartService.getCartByUserId(user._id);
  const itemsToBeDeleted = await productService.getProductById(items.productId);
  const newCart = await cartService.deleteItemsFromUserCart(
    cart,
    itemsToBeAdded,
    quantity
  );
  console.log(user, newCart);
  res.status(httpStatus.OK).send({ user, cart: newCart });
});

module.exports = { addItemsToCart, getAllCartItems, removeCartItems };
