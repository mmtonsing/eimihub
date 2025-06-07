// server/models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  content: String,
  blogCategory: {
    type: String,
    enum: ['tech', 'painting', 'music', 'academic', 'business', 'sports', 'others'],
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