const mongoose = require("mongoose");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { orderService } = require("../services");

const createOrder = catchAsync(async (req, res) => {
  const reqBody = req.body;
  try {
    const newOrder = await orderService.createOrder(reqBody);
    res.send({
      error: null,
      data: newOrder.data_id
    })
  } catch (error) {
    res.send({
      error: error.message
    })
  }
})

const getOrdersByUserId = catchAsync(async (req, res) => {
  const { userId } = req.locals;
  if (userId === undefined) {
    res.send({
      error: "User was not found"
    });
  }
  const data = await orderService.getOrdersByUserId(userId);
  // if (response.success === false) {
  //   res.send({
  //     error: response.error
  //   });
  // } else {
  //   res.send({
  //     data: response.data,
  //     error: null
  //   });
  // }
  res.send({
    error: null,
    data: data
  });
})

// multiple table
const getOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (id === null) {
    res.send({
      error: "ID was null"
    })
  }
  try {
    const data = await orderService.getOrderWithProductDatasById(id);
    res.send({
      error: null,
      data: data
    })
  } catch (error) {
    res.send({
      error: error.message
    })
  }
  // const response = await orderService.getOrderWithProductDatasById(id);
  // if (response.success === false) {
  //   res.send({
  //     error: response.error
  //   })
  // } else {
  //   res.status(httpStatus.OK).send({
  //     data: response.data,
  //     error: null
  //   })
  // }
})

const updateOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const operation = req.params.operation;
  if (id === null) {
    return {
      error: "ID was null"
    }
  }
  if (operation === "pay") {
    const reqBody = req.body;
    try {
      const data = await orderService.payOrder(id, reqBody);
      res.send({
        error: null,
        data: data
      })
    } catch (error) {
      res.send({
        error: error.message
      })
    }
    // const response = await orderService.payOrder(id, reqBody);
    // if (response.success === false) {
    //   res.send({
    //     error: response.error
    //   })
    // } else {
    //   res.status(httpStatus.OK).send({
    //     data: response.data,
    //     error: null
    //   })
    // }
  } else if (operation === "cancel") {
    try {
      const data = await orderService.cancelOrder(id);
      res.send({
        error: null,
        data: data
      })
    } catch (error) {
      res.send({
        error: error.message
      })
    }
    // const response = await orderService.cancelOrder(id);
    // if (response.success === false) {
    //   res.send({
    //     error: response.error
    //   })
    // } else {
    //   res.status(httpStatus.OK).send({
    //     data: response.data,
    //     error: null
    //   })
    // }
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