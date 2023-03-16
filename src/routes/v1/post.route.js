const express = require('express');
const { postController } = require('../../controllers');
const postValidation = require('../../validations/post.validation');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const router = express.Router();

router  
  .route('/')
  .post(auth('manageUsers'),  validate(postValidation.createPost) ,postController.createPost)
  .get(auth('getUsers'),validate(postValidation.getPosts), postController.getPosts)
  
router
  .route('/:postId')
  .get(auth('getUsers'), validate(postValidation.getPost), postController.getPost)
  .patch(auth('manageUsers'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth('manageUsers'), validate(postValidation.deletePost), postController.deletePost);

router
  .route('/public/latest_posts')
  .get(postController.getLatestPosts);

router
  .route('/public/latest_posts/:postId')
  .get(postController.getLatestPost)
  .patch(postController.viewCountsPost)


module.exports = router;