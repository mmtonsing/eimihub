if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend port or domain
    credentials: true
  }));
app.use(express.json());

// Session setup
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 day
      },
    })
);
  
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect Database
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/eimihub';
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
    console.log("Database connection error")
    })

// Routes(use or specify main routes)
// Routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes); // Register, login, logout

// app.get('/', (req, res) => console.log('home page'));
//default route
// app.get('/', (req, res) => res.send('API is running...'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});