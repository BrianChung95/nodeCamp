const mongoose = require('mongoose');

const cartItem = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number, 
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
)

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    cartItems: {
      type: [cartItem],
      required: true
    }
  }, {
    timestamps: true
  }
)

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;