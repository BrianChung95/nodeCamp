const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { Order } = require('../models');
const { getProductsByIds } = require('./product.service');
const ApiError = require('../utils/ApiError');

const createOrder = async (userBody) => {
  const { userId, orderItems } = userBody;
  const costPrice = orderItems.reduce((pre, cur) => pre + cur.price, 0);
  const totalQuantity = orderItems.reduce((pre, cur) => pre + cur.quantity, 0);
  try {
    const query = await Order.create({userId, orderItems: orderItems, costPrice, totalQuantity})
    if (query === null) {
      return {
        success: false,
        error: "Failed to create"
      }
    } else {
      return {
        success: true,
        data: query
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
};

const getOrderById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  // return Order.findById(_id);
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

const getOrderWithProductDatasById = async (id) => {
  const orderData = await Order.findById(id);
  if (orderData) {
    const orderItems = orderData.orderItems;
    const newOrderItems = await makeupData(orderItems);
    const newOrderData = JSON.parse(JSON.stringify(orderData));
    newOrderData['orderItems'] = newOrderItems;
    return {
      success: true,
      data: newOrderData
    }
  } else {
    return {
      success: false,
      error: "Failed to get order with id: " + id
    }
  }
};

const makeupData = async (orderItems) => {
  const ids = orderItems.map((item) => item.productId);
  const productDatas = await getProductsByIds(ids);
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

const payOrder = async (id, userBody) => {
  const orderData = await Order.findById(id);
  if (orderData === null) {
    return {
      success: false,
      error: "Could not found data with " + id
    }
  }
  // const jsonUserBody = JSON.parse(userBody);
  const { email, name, creditCardNumber, expireDate } = userBody;
  // console.log(userBody);
  if (email === undefined || name === undefined || creditCardNumber === undefined || expireDate === undefined) {
    return {
      success: false,
      error: "userBody has undefined data"
    }
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
  try {
    const query = await Order.findByIdAndUpdate(id, updata, options);
    if (query === null) {
      return {
        success: false,
        error: "Fail to update"
      }
    }
    const orderItems = query.orderItems;
    const newOrderItems = makeupData(orderItems);
    const newOrderData = JSON.parse(JSON.stringify(query));
    newOrderData['orderItems'] = newOrderItems;
    return {
      success: true,
      data: newOrderData
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const cancelOrder = async (id) => {
  const orderData = await Order.findById(id);
  if (orderData === null) {
    return {
      success: false,
      error: "Could not found data with " + id
    }
  }
  const update = {
    "status": "CANCELED"
  };
  const options = {'new': true, 'runValidators': true};
  try {
    const query = await Order.findByIdAndUpdate(id, update, options);
    if (query === null) {
      return {
        success: false,
        error: "Failed to update"
      }
    }
    return {
      success: true,
      data: query
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const getOrdersByUserId = async (userId) => {
  const orderDatas = await Order.find({'userId': userId});
  if (orderDatas.length > 0) {
    let newOrderDatas = [];
    for (const data of orderDatas) {
      const orderItems = data.orderItems;
      const newOrderItems = await makeupData(orderItems);
      const newOrderData = JSON.parse(JSON.stringify(data));
      newOrderData['orderItems'] = newOrderItems;
      newOrderDatas.push(newOrderData);
    }
    return {
      success: true,
      data: newOrderDatas
    }
  }
  return {
    success: true,
    data: orderDatas
  }
}

module.exports = { 
  createOrder, 
  getOrderById, 
  getOrderWithProductDatasById, 
  payOrder, 
  cancelOrder, 
  getOrdersByUserId 
};