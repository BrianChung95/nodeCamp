const mongoose = require('mongoose');
const httpStatus = require("http-status");
const { Category, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (userBody) => {
  if (await Category.isCategoryExist(userBody.category) === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category not existed");
  }
  const { category, name, description, thumbnail, price } = userBody;
  // const _category = Number(category);
  const _category = mongoose.Types.ObjectId(category);
  const _price = Number(price);
  let newUserBody = {
    category: _category,
    name,
    description,
    thumbnail,
    price: _price
  }
  return Product.create(newUserBody);
};

const getProductById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Product.findById(_id);
}

const getProductsByIds = async (ids) => {
  // const _ids = ids.map((i) => { return mongoose.Types.ObjectId(i) });
  return Product.find({
    '_id': {
      $in: ids
    }
  })
}

const getAllProducts = async () => {
  return Product.find();
}

const getProductsByCategoryId = async (cateId) => {
  return Product.find({ category: cateId });
}

module.exports = { 
  createProduct, 
  getProductById, 
  getAllProducts, 
  getProductsByCategoryId,
  getProductsByIds
}