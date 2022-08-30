const mongoose = require('mongoose');
// const validator = require('validator');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.statics.isCategoryExist = async function(id) {
  const category = await this.findById(id);
  return category !== undefined
}

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;