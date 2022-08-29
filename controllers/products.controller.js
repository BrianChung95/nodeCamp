// const httpStatus = require('htt')
const catchAsync = require('../utils/catchAsync');

const getAllProducts = catchAsync(async (req, res) => {
  res.json({
    status: 'success',
    message: 'getAllProducts'
  });
});

const getProductsByCategory = catchAsync(async (req, res) => {

});

const getProductById = catchAsync(async (req, res) => {

});

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById
};