const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService, productService } = require('../services');

const getCart = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const response = await cartService.getCart(userId);
  if (response.success === false) {
    res.send({
      success: false,
      error: response.error
    });
  }
  const cartItems = response.data.cartItems;
  const newCartItems = await makeupData(cartItems);
  res.status(httpStatus.OK).send({
    success: true,
    cartItems: newCartItems
  });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const { cart } = req.body;
  const response = await cartService.updateCart({ userId, cart })
  if (response.success === false) {
    res.send({
      success: false,
      error: response.error,
    });
  }
  const cartItems = response.data.cartItems;
  const newCartItems = await makeupData(cartItems);
  res.status(httpStatus.OK).send({
    success: true,
    cartItems: newCartItems
  });
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