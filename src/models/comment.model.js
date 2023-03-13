const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');


const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    
    postId: {
      type: String,
      required: false
    },

  },
  {
    timestamps: true,
  }
);
  
// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;