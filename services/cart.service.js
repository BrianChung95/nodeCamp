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

module.exports = { getCartByUserId };
