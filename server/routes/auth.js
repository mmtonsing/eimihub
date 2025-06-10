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

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(200).json(registeredUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Now the session is established and cookie can be sent
      res.json({ message: "Logged in(backend)", user: req.user });
    });
  })(req, res, next);
});

// check if user is logged in
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authenticated by route/auth.js");
    res.json({ loggedIn: true, user: req.user });
  } else {
    console.log("not authenticated by route/auth.js");
    res.status(401).json({ loggedIn: false });
  }
});

// LOGOUT ROUTE
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
