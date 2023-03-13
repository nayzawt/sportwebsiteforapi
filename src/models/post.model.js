const { string } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');


const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }, 
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false
    },
    commentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
      required: false
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: false,
    },
    desc: {
      type: String,
      required: true,
    },
    viewCounts: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);
  
// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
