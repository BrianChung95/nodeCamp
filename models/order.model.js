const mongoose = require('mongoose');
const validator = require('validator');
const { productSchema } = require('./product.model'); 

const purchaseInfoSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email")
        }
      }
    },
    name: {
      type: String,
      trim: true,
    },
    creditCardNumber: {
      type: String,
      required: true,
      trim: true
    }
  }, {
    timestamps: true
  }
)

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      trim: true
    },
    purchaseInfo: {
      type: purchaseInfoSchema,
      required: true
    },
    purchasedItem: {
      type: [productSchema],
      required: true
    },
    costPrice: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;