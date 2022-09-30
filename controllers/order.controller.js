const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const response = await orderService.createOrder(reqBody);
  if (response.success === false) {
    res.send({
      error: response.error
    });
  } else {
    res.status(httpStatus.OK).send({
      data: response.data._id,
      error: null
    })
  }
})

const getOrdersByUserId = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const response = await orderService.getOrdersByUserId(userId);
  if (response.success === false) {
    res.send({
      error: response.error
    })
  } else {
    res.send({
      data: response.data,
      error: null
    })
  }
})

// multiple table
const getOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (id === null) {
    res.send({
      error: "ID was null"
    })
  }
  const response = await orderService.getOrderWithProductDatasById(id);
  if (response.success === false) {
    res.send({
      error: response.error
    })
  } else {
    res.status(httpStatus.OK).send({
      data: response.data,
      error: null
    })
  }
})

const updateOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const operation = req.params.operation;
  if (id === null) {
    return {
      error: 'ID was null'
    }
  }
  if (operation === 'pay') {
    const reqBody = req.body;
    const response = await orderService.payOrder(id, reqBody);
    if (response.success === false) {
      res.send({
        error: response.error
      })
    } else {
      res.status(httpStatus.OK).send({
        data: response.data,
        error: null
      })
    }
  } else if (operation === 'cancel') {
    const response = await orderService.cancelOrder(id);
    if (response.success === false) {
      res.send({
        error: response.error
      })
    } else {
      res.status(httpStatus.OK).send({
        data: response.data,
        error: null
      })
    }
  } else {
    res.send({
      error: "Request denied"
    })
  }
})

module.exports = {
  createOrder,
  getOrderById,
  updateOrderById,
  getOrdersByUserId
};