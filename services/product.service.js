const mongoose = require('mongoose');
const httpStatus = require("http-status");
const { Category, Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {any} userBody 
 * @returns {Promise<Product>}
 */
const createProduct = async (userBody) => {
  if (await Category.isCategoryExist(userBody.category) === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category not existed");
  }
  const { category, name, description, thumbnail, price } = userBody;
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

/**
 * Get the product by specific id
 * @param {any} id 
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
}

/**
 * Get an array of products by the specific array of ids
 * @param {any[]} ids 
 * @returns {Promise<Product>[]}
 */
const getProductsByIds = async (ids) => {
  return Product.find({
    '_id': {
      $in: ids
    }
  });
}

/**
 * Get all products
 * @returns {Promise<Product>[]}
 */
const getAllProducts = async () => {
  return Product.find();
}

/**
 * Get all products with the specific category id
 * @param {any} cateId 
 * @returns {Promise<Product>[]}
 */
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