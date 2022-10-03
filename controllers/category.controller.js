const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getAllCategories = catchAsync(async (req, res) => {
  const data = await categoryService.getCategories();
  res.status(httpStatus.OK).send({
    error: null,
    data
  })
});

const createCategory = catchAsync(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  res.send({
    error: null,
    data: "Create category success"
  })
});

module.exports = {
  getAllCategories,
  createCategory
};