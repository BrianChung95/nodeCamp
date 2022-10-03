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
  res.send({
    error: null,
    data
  })
})

const getAllProducts = catchAsync(async (req, res) => {
  const data = await productService.getAllProducts();
  res.status(httpStatus.OK).send({ 
    error: null,
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
    error: null,
    data
  });
});

const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (id === null) {
    res.send({
      error: "ID was not found"
    })
  }
  const productData = await productService.getProductById(id);
  const categoryID = productData.category;
  const categoryData = await categoryService.getCategoryById(categoryID);
  if (productData === null) {
    res.status(httpStatus.NOT_FOUND).send({
      error: "Not Found"
    });
  } else {
    const data = {
      productData,
      categoryData
    }
    res.status(httpStatus.OK).send({
      data,
      error: null
    });
  }
});

// for test
const createProduct = catchAsync(async (req, res) => {
  const reqBody = req.body;
  try {
    const response = await productService.createProduct(reqBody);
    res.send({
      error: null,
      data: "Create product success"
    })
  } catch (error) {
    res.send({
      error: error
    })
  }
});

module.exports = {
  getAllProductsAndAllCategories,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct
};