const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

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

module.exports = { getCategories, getCategoryById };