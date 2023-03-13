const express = require('express');
const { commentController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post( commentController.createComment)
  .get( commentController.getComments)
  
router
  .route('/:commentId')
  .get( commentController.getComment)
  .delete( commentController.deleteComment);

module.exports = router;