// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

// // Check for required environment variables early
// ['SESSION_SECRET', 'DB_URL', 'CLIENT_URL'].forEach(key => {
//   if (!process.env[key]) {
//     throw new Error(`Missing required env var: ${key}`);
//   }
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('./models/user');
// const MongoStore = require('connect-mongo');

// // Connect Database
// const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/eimihub';
// mongoose.connect(dbUrl)
//     .then(() => {
//         console.log("Database connected")
//     })
//   .catch(err =>
//     console.error("Database connection error:", err));

// const app = express();

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
// }

// //middlewares
// app.use(cors({
//     origin: process.env.CLIENT_URL, // replace with your frontend port or domain
//     credentials: true
// }));
  
// app.use((req, res, next) => {
//   console.log(`Incoming request(index.js): ${req.method} ${req.url}`);
//   next();
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const secret = process.env.SESSION_SECRET || 'iamnotaSegarete';

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   touchAfter: 24 * 60 * 60, //24 hrs(displayed in seconds- 60*60)
//   crypto: {
//     secret,
//   }
// });
// store.on('connected', function () {
//   console.log('Session store connected to MongoDB');
// });
// store.on('error', function (e) {
//   console.log('SESSION STORE ERROR', e);
// });

// // Session setup
// const sessionConfig = {
//     store,
//     name:'session',
//       secret: 'iamaboygirlboy',
//       resave: false,
//       saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // true in production
//           sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//           maxAge: 1000 * 60 * 60 * 24 * 7, // 1 day
//       }
//     }

// app.use(session(sessionConfig));


// // Passport setup
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate())); // from passport-local-mongoose
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Routes(use or specify main routes)
// // Routes
// const blogRoutes = require('./routes/blogs');
// const authRoutes = require('./routes/auth');
// app.use('/blogs', blogRoutes);
// app.use('/auth', authRoutes); // Register, login, logout

// // Debug current session on every request
// app.use((req, res, next) => {
//   console.log('🔍 Session:', req.session);
//   next();
// });

// // app.get('/', (req, res) => console.log('home page'));
// //default route
// // app.get('/', (req, res) => res.send('API is running...'));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Required variables
["SESSION_SECRET", "DB_URL", "CLIENT_URL"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();

// Trust proxy for secure cookies (if deployed)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// MongoDB connection
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// CORS with credentials
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB session store
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: { secret: process.env.SESSION_SECRET }
});
store.on("error", e => console.log("❌ Session store error", e));

// Session config
const sessionConfig = {
  store,
  name: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ⬅️ Send only on HTTPS in prod
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", // ⬅️ Important for cross-site cookie in prod
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
};

app.use(session(sessionConfig));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Session debug (optional)
app.use((req, res, next) => {
  console.log("🔐 Session ID:", req.session.id);
  console.log("👤 Logged in user:", req.user);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
