const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService, productService } = require('../services');

const getCart = catchAsync(async (req, res) => {
  const userId = req.locals.userId;
  if (userId === undefined) {
    res.send({
      error: "User was not found"
    });
  }
  try {
    const response = await cartService.getCart(userId);
    if (response === null) {
      res.send({
        // error: "No Cart Data"
        error: null,
        data: []
      });
      return;
    }
    const cartItems = response.data.cartItems;
    const newCartItems = await makeupData(cartItems);
    res.send({
      error: null,
      data: newCartItems
    });
  } catch (error) {
    res.send({
      error: error.message
    })
  }
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.locals.userId;
  if (userId === undefined) {
    res.send({
      error: "User was not found"
    })
  }
  const { cart } = req.body;
  try {
    const response = await cartService.updateCart({ userId, cart })
    const cartItems = response.data.cartItems;
    const newCartItems = await makeupData(cartItems);
    res.status(httpStatus.OK).send({
      error: null,
      data: newCartItems
    });
  } catch (error) {
    res.send({
      error: error.message
    })
  }
})

const makeupData = async (cartDataInDoc) => {
  const ids = cartDataInDoc.map((item) => { return item.productId });
  const productDatas = await productService.getProductsByIds(ids);
  let newCartItems = [];
  cartDataInDoc.forEach((item) => {
    const product = productDatas.filter((data) => { return data._id.toString() === item.productId.toString() })
    if (product.length > 0) {
      const newItem = {
        productData: product[0],
        quantity: item.quantity
      };
      newCartItems.push(newItem);
    }
  })
  return newCartItems;
}

module.exports = {
  getCart,
  updateCart
};