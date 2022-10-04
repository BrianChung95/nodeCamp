const mongoose = require('mongoose');
const { Cart } = require('../models');
const { getUserById } = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a cart
 * @param {any} userBody 
 * @returns {Promise<Cart>}
 * @throws
 */
const createCart = async (userBody) => {
  const { userId } = userBody;
  const objectUserId = mongoose.Types.ObjectId(userId);
  const result = await getUserById(objectUserId);
  if (result === null) {
    throw new ApiError(null, "UserId was not existed")
  }
  const newCart = {
    userId,
    cartItems: []
  };
  return Cart.create(newCart);
}

/**
 * Update the cart
 * @param {any} userBody 
 * @returns {Promise<Cart>}
 * @throws
 */
const updateCart = async (userBody) => {
  const { userId, cart } = userBody;
  const objectUserId = mongoose.Types.ObjectId(userId);
  const result = await getUserById(objectUserId);
  if (result === null) {
    throw new ApiError(null, "UserId was not found")
  }
  const newCart = cart.map((item) => { return { productId: mongoose.Types.ObjectId(item.productId), quantity: item.quantity } })
  const filter = {'userId': userId};
  const update = { cartItems: newCart };
  const options = {'upsert': true, 'new': true};
  return Cart.findOneAndUpdate(filter, update, options);
}

/**
 * Get cart by specific UserID
 * @param {any} userId 
 * @returns {Promise<Cart>}
 * @throws
 */
const getCart = async (userId) => {
  const result = await getUserById(userId);
  if (result === null) {
    throw new ApiError(null, "UserId was not existed")
  }
  return Cart.findOne({'userId': userId});
}

module.exports = {
  createCart,
  updateCart,
  getCart
};