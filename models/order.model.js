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
    },
    expireDate: {
      type: String,
      require: true,
      trim: true
    }
  }, {
    timestamps: true
  }
)

// const orderItemSchema = mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: true
//     },
//     quantity: {
//       type: Number, 
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     }
//   }
// )

const statusEnum = ["PENDING", "CANCELED", "COMPLETED"]

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    purchaseInfo: {
      type: purchaseInfoSchema,
      required: false
    },
    orderItems: [
      {
        productId: {
          type: String,
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
    ],
    costPrice: {
      type: Number,
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: statusEnum,
      default: "PENDING"
    }
  }, {
    timestamps: true
  }
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;