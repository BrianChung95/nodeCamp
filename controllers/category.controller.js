const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getAllCategories = catchAsync(async (req, res) => {
  const data = await categoryService.getCategories();
  res.status(httpStatus.OK).send({
    data
  })
});

const createCategory = catchAsync(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  console.log(newCategory);
  res.send({
    "success": true,
    "message": "Create category success"
  })
});

module.exports = {
  getAllCategories,
  createCategory
};