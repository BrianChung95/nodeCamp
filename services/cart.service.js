import Cart from "../models";

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      return cart;
    } else {
      return null;
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const creatCart = async (userId, cartItems) => {
  let newCartBody = { userId, cartItems };
  return Cart.create(newCartBody);
};

const addItemsToUserCart = async (cart, items, quantity) => {
  const { _id, price } = items;
  if (cart) {
    //if cart exists
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.productId === _id
    );

    if (itemIndex > -1) {
      // if product exists in cart
      let product = cart.cartItems[itemIndex];
      product.quantity += quantity;
      cart.cartItems[itemIndex] = product;
      await cart.save();
      return cart;
    } else {
      //if product doesn't exist
      cart.cartItems.push({ productId: _id, quantity, price });
      await cart.save();
      return cart;
    }
  } else {
    //if cart doesn't exist
    let cartItems = { productId: _id, quantity, price };
    return creatCart(_id, cartItems);
  }
};

const deleteItemsFromUserCart = async (cart, items, quantity) => {
  const { _id } = items;
  if (cart) {
    //if cart exists
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.productId === _id
    );

    if (itemIndex > -1) {
      // if product exists in cart
      let product = cart.cartItems[itemIndex];
      product.quantity -= quantity;
      cart.cartItems[itemIndex] = product;
      await cart.save();
      return cart;
    } else {
      //if product doesn't exist
      console.log("items not found");
    }
  } else {
    //if cart doesn't exist
    console.log("items not found");
  }
};

module.exports = {
  getCartByUserId,
  addItemsToUserCart,
  deleteItemsFromUserCart,
};
