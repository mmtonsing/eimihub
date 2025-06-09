const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// GET all blogs (or filtered by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { blogCategory: category } : {};

    const blogs = await Blog.find(filter)
    .populate('author', 'username') // makes blog.author.username available
      .sort({ createdAt: -1 });             // latest first

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//view into a single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// UPDATE blog by id
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc & validate input
    );
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update blog' });
  }
});

// DELETE a blog
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// POST a new blog
router.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'You must be logged in to create a blog' });
    }
    console.log('User on post request:', req.user);
    console.log('Request body:', req.body);
    const newBlog = new Blog({
      ...req.body,
      author: req.user._id // assuming you're using authentication
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});



module.exports = router;