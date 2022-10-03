const mongoose = require('mongoose');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');
const { getProductsByIds } = require('./product.service');

/**
 * Create an order
 * @param {any} userBody 
 * @returns {Promise<Order>}
 */
const createOrder = async (userBody) => {
  const { userId, orderItems } = userBody;
  const costPrice = orderItems.reduce((pre, cur) => pre + cur.price, 0);
  const totalQuantity = orderItems.reduce((pre, cur) => pre + cur.quantity, 0);
  return Order.create({userId, orderItems: orderItems, costPrice, totalQuantity});
};

const getOrderById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  const query = await Order.findById(_id);
  if (query === null) {
    return {
      success: false,
      error: "Could not find order with id: " + id
    }
  } else {
    return {
      success: true,
      data: query
    }
  }
};

/**
 * Get Order with detail by specific Order ID
 * @param {any} id 
 * @returns {Promise<Order>}
 * @throws 
 */
const getOrderWithProductDatasById = async (id) => {
  const orderData = await Order.findById(id);
  if (orderData) {
    const orderItems = orderData.orderItems;
    const newOrderItems = await makeupData(orderItems);
    const newOrderData = JSON.parse(JSON.stringify(orderData));
    newOrderData['orderItems'] = newOrderItems;
    // return {
    //   success: true,
    //   data: newOrderData
    // }
    return newOrderData;
  } else {
    // return {
    //   success: false,
    //   error: "Failed to get order with id: " + id
    // }
    throw new ApiError(null, "Failed to get order with id: " + id)
  }
};

const makeupData = async (orderItems) => {
  const ids = orderItems.map((item) => item.productId);
  const productDatas = await getProductsByIds(ids);
  if (success === false) {
    return []
  }
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
  return newOrderItems;
}

/**
 * Pay the order
 * @param {any} id 
 * @param {any} userBody 
 * @returns {Promise<Order>}
 * @throws
 */
const payOrder = async (id, userBody) => {
  const orderData = await Order.findById(id);
  if (orderData === null) {
    throw new ApiError(null, "Could not found data with " + id)
  }
  const { email, name, creditCardNumber, expireDate } = userBody;
  if (email === undefined || name === undefined || creditCardNumber === undefined || expireDate === undefined) {
    throw new ApiError(null, "userBody has undefined data")
  }
  const updata = {
    "purchaseInfo": {
      email,
      name,
      creditCardNumber,
      expireDate
    },
    "status": "COMPLETED"
  };
  const options = {'new': true, 'runValidators': true};
  const query = await Order.findByIdAndUpdate(id, updata, options);
  if (query === null) {
    throw new ApiError(null, "Fail to update");
  }
  const orderItems = query.orderItems;
  const newOrderItems = makeupData(orderItems);
  const newOrderData = JSON.parse(JSON.stringify(query));
  newOrderData['orderItems'] = newOrderItems;
  return newOrderData
}

/**
 * Cancel the order
 * @param {any} id 
 * @returns {Promise<Order>}
 * @throws
 */
const cancelOrder = async (id) => {
  const orderData = await Order.findById(id);
  if (orderData === null) {
    // return {
    //   success: false,
    //   error: "Could not found data with " + id
    // }
    throw new ApiError(null, "Could not found data with " + id)
  }
  const update = {
    "status": "CANCELED"
  };
  const options = {'new': true, 'runValidators': true};
  return Order.findByIdAndUpdate(id, update, options);
}

/**
 * Get the specific user's orders
 * @param {any} userId 
 * @returns {Promise<Order>[]}
 */
const getOrdersByUserId = async (userId) => {
  const orderDatas = await Order.find({'userId': userId});
  let newOrderDatas = [];
  if (orderDatas.length > 0) {
    for (const data of orderDatas) {
      const orderItems = data.orderItems;
      const newOrderItems = await makeupData(orderItems);
      const newOrderData = JSON.parse(JSON.stringify(data));
      newOrderData['orderItems'] = newOrderItems;
      newOrderDatas.push(newOrderData);
    }
  }
  // return {
  //   success: true,
  //   data: orderDatas
  // }
  return newOrderDatas;
}

module.exports = { 
  createOrder, 
  getOrderById, 
  getOrderWithProductDatasById, 
  payOrder, 
  cancelOrder, 
  getOrdersByUserId 
};