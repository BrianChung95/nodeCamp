const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService, categoryService } = require('../services')

const getAllProductsAndAllCategories = catchAsync(async (req, res) => {
  const productData = await productService.getAllProducts();
  const categoriesData = await categoryService.getCategories();
  const data = {
    products: productData,
    categories: categoriesData
  };
  res.status(httpStatus.OK).send({
    products: productData,
    categories: categoriesData
  });
})

const getAllProducts = catchAsync(async (req, res) => {
  const data = await productService.getAllProducts();
  res.status(httpStatus.OK).send({ 
    data
   });
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const cateid = req.params.cateId;
  let data;
  if (cateid !== undefined) {
    data = await productService.getProductsByCategoryId(cateid);
  } else {
    data = await productService.getAllProducts();
  }
  res.status(httpStatus.OK).send({ 
    data
  });
});

const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (id === null) {
    return
  }
  const productData = await productService.getProductById(id);
  const categoryID = productData.category;
  const categoryData = await categoryService.getCategoryById(categoryID);
  if (productData === null) {
    res.status(httpStatus.NOT_FOUND).send({
      err: "Not Found"
    });
  } else {
    res.status(httpStatus.OK).send({
      // data
      productData,
      categoryData
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
  getAllProductsAndAllCategories,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct
};