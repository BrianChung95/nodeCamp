const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.route('/categories').get(categoryController.getAllCategories);
router.route('/category').post(categoryController.createCategory);

module.exports = router;