const mongoose = require('mongoose');
const { toJSON, paginate } = require("./plugins");

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
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

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };