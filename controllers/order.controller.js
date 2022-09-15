const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService, productService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const newOrder = await orderService.createOrder(reqBody);
  res.status(httpStatus.OK).send({
    orderId: newOrder._id,
  });
})

// multiple table
const getOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (id === null) {
    return
  }
  const orderData = await orderService.getOrderWithProductDatasById(id);
  res.status(httpStatus.OK).send({
    data: orderData
  });
})

module.exports = {
  createOrder,
  getOrderById
};