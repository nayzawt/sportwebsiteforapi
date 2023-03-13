const express = require('express');
const { categoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const categoryValidation = require('../../validations/category.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(auth('getUsers'), validate(categoryValidation.getCategories), categoryController.getCategories)
  
router
  .route('/:categoryId')
  .get(auth('getUsers'),validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('manageUsers'),validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth('manageUsers'),validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

router
  .route('/public/latest_categories')
  .get(categoryController.latestCategory);

router
  .route('/public/latest_categories/:categoryId')
  .get(categoryController.getLatestCategory);

module.exports = router;