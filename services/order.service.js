const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Order, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (userBody) => {
  const { userId, orderItems } = userBody;
  const objectedIDUserId = mongoose.Types.ObjectId(userId);
  const costPrice = orderItems.reduce((pre, cur) => pre + cur.price, 0);
  const totalQuantity = orderItems.reduce((pre, cur) => pre + cur.quantity, 0);
  return Order.create({
    userId,
    orderItems: orderItems,
    costPrice,
    totalQuantity
  })
};

const getOrderById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Order.findById(_id);
};

const getOrderWithProductDatasById = async (id) => {
  const orderData = await Order.findById(id);
  if (orderData) {
    const orderItems = orderData.orderItems;
    const _ids = orderItems.map((item) => { return mongoose.Types.ObjectId(item.productId) })
    const productDatas = await Product.find({
      "_id": {
        $in: _ids
      }
    })
    let newOrderItems = [];
    orderItems.forEach((item) => {
      const product = productDatas.filter((data) => { return data._id.toString() === item.productId })
      if (product.length > 0) {
        const newItem = {
          cost: item.price,
          quantity: item.quantity,
          _id: product[0]._id,
          name: product[0].name,
          thumbnail: product[0].thumbnail,
          price: product[0].price
        }
        newOrderItems.push(newItem)
      }
    })
    const newOrderData = JSON.parse(JSON.stringify(orderData));
    newOrderData['orderItems'] = newOrderItems;
    return newOrderData;
  } else {

  }
};

module.exports = { createOrder, getOrderById, getOrderWithProductDatasById };