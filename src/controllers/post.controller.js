const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService, categoryService, userService } = require('../services');
const multer = require('multer');

const createPost = catchAsync(async (req, res) => {
  let formData = req.body
  formData.userId = req.user._id
  formData.desc = req.EditorJsBody
  const post = await postService.createPost(formData);
  await categoryService.updateNumberOfPosts(formData.category);
  await userService.updateNumberOfPosts(formData.userId)
  res.status(httpStatus.CREATED).send(post);
  console.log(post)
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'user,category'
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  let formData = req.body
  formData.desc = req.EditorJsBody
  const post = await postService.updatePostById(req.params.postId, formData);
   await categoryService.updateNumberOfPosts(req.body.category);

  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await postService.deletePostById(req.params.postId);
  await categoryService.updateNumberOfPosts(post.category);
  await userService.updateNumberOfPosts(post.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLatestPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'category']);
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = "user,category"
  const result = await postService.latestPosts(filter, options);
  res.send(result);
  // let result = await Post.find().populate('category').exec();
  // res.send(result);
});

const getLatestPost = catchAsync(async (req, res) => {
  const post = await postService.getLatestPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const viewCountsPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
  const update = await postService.updatePostById(req.params.postId, {viewCounts: post.viewCounts + 1});
  res.send(update)
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getLatestPosts,
  getLatestPost,
  viewCountsPost
}
