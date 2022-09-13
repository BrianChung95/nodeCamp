const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const newOrder = await orderService.createOrder(reqBody);
  res.status(httpStatus.OK).send({
    orderId: newOrder._id,
  });
})

module.exports = {
  createOrder
};