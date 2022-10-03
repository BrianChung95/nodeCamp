const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {any} userBody 
 * @returns {Promise<Category>}
 * @throw
 */
const createCategory = async (userBody) => {
  if (await Category.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category Name already taken");
  }
  return Category.create(userBody);
}

/**
 * Get all categories
 * @returns {Promise<Category>}
 */
const getCategories = async () => {
  return Category.find();
};

/**
 * Get category by id
 * @param {ObjectId} id 
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

module.exports = { getCategories, getCategoryById, createCategory };