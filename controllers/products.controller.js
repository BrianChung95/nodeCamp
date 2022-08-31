const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services')

const getAllProducts = catchAsync(async (req, res) => {
  const data = await productService.getAllProducts();
  res.status(httpStatus.OK).send({ 
    data
   });
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const cateid = req.params.cateId;
  const data = await productService.getProductsByCategoryId(cateid);
  res.status(httpStatus.OK).send({ 
    data
  });
});

const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await productService.getProductById(id);
  if (data === null) {
    res.status(httpStatus.NOT_FOUND).send({
      err: "Not Found"
    });
  } else {
    res.status(httpStatus.OK).send({
      data
    });
  }
});

// for test
const createProduct = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const newProduct = await productService.createProduct(reqBody);
  res.send({
    "success": true,
    "message": "Create product success",
  });
});

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct
};