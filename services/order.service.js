const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (userBody) => {
  // console.log(userBody);
  const { userId, orderItems } = userBody;
  const objectedIDUserId = mongoose.Types.ObjectId(userId);
  const jsonOrderItems = JSON.parse(orderItems);
  const costPrice = jsonOrderItems.reduce((pre, cur) => pre + cur.price, 0);
  return Order.create({
    userId,
    orderItems: jsonOrderItems,
    costPrice
  })
};

module.exports = { createOrder };