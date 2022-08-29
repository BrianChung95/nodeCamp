const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    productId: {
      type: Number,
      required: true,
    }
  }, {
    timestamps: true
  }
)

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;