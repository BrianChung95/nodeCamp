const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Cart, Product } = require('../models');
const { getUserById } = require('./user.service');
const ApiError = require('../utils/ApiError');

const createCart = async (userBody) => {
  const { userId } = userBody;
  const objectUserId = mongoose.Types.ObjectId(userId);
  const result = await getUserById(objectUserId);
  if (result === null) {
    return {
      success: false,
      error: 'UserId was not existed'
    };
  }
  const newCart = {
    userId,
    cartItems: []
  };
  Cart.create(newCart);
  return {
    success: true
  };
}

const updateCart = async (userBody) => {
  const { userId, cart } = userBody;
  const objectUserId = mongoose.Types.ObjectId(userId);
  const result = await getUserById(objectUserId);
  if (result === null) {
    return {
      success: false,
      error: 'UserId was not existed'
    };
  }
  const newCart = cart.map((item) => { return { productId: mongoose.Types.ObjectId(item.productId), quantity: item.quantity } })
  const filter = {'userId': userId};
  const update = { cartItems: newCart };
  const options = {'upsert': true, 'new': true};
  const data = await Cart.findOneAndUpdate(filter, update, options);
  if (data === null) {
    return {
      success: false,
      error: 'Failed to update'
    }
  }
  return { 
    success: true,
    data: data
  };
}

const getCart = async (userId) => {
  const objectUserId = mongoose.Types.ObjectId(userId);
  const result = await getUserById(objectUserId);
  if (result === null) {
    return {
      success: false,
      error: 'UserId was not existed'
    };
  }
  const cart = await Cart.findOne({'userId': userId});
  if (cart === null) {
    return {
      success: false,
      error: 'Cart was not found'
    }
  }
  return {
    success: true,
    data: cart
  };
}

module.exports = {
  createCart,
  updateCart,
  getCart
};