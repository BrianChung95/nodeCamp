const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    categoryId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    isOnSale: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };