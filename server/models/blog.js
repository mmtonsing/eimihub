// server/models/Blogs.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  content: String,
  blogCategory: {
    type: String,
    enum: ['tech', 'painting', 'author', 'music', 'academic', 'business', 'sports', 'art', 'others'],
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema);