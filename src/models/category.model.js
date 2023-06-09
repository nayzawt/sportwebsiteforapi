const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');


const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numberOfPosts: {
      type: Array,
      default: [],
    }

  },
  {
    timestamps: true,
  }
);
  
// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;