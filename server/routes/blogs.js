// server/routes/posts.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// GET all blogs (or filtered by category)
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { blogCategory: category } : {};
  const blogs = await Blog.find(filter);
  res.json(blogs);
});

// POST a new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

module.exports = router;