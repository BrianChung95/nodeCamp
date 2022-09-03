const mongoose = require('mongoose');
const { toJSON, paginate } = require("./plugins");
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

/**
 * Check if category name is taken
 * @param {string} name 
 * @param {ObjectId} excludeCategoryId - The id of the category to be exclued
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
  return !!category;
}

categorySchema.statics.isCategoryExist = async function(id) {
  const category = await this.findById(id);
  return category !== undefined
}

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;