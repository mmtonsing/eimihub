const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    res.status(200).json(registeredUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

// LOGOUT ROUTE
router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
