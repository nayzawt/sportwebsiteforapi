const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */

const createComment = async (commentBody) => {
    return Comment.create(commentBody);
};

/**
 * Query for comment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryComment = async (filter, options) => {
    const comments = await Comment.paginate(filter, options);
    return comments;
};

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
    return Comment.findById(id).populate('postId');
};

/**
 * Delete Comment by id
 * @param {ObjectId} commentById
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
    const comment = await getCommentById(commentId);
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
    }
    await comment.remove();
    return comment;
};



module.exports = {
    createComment,
    queryComment,
    getCommentById,
    deleteCommentById,
}

