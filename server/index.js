if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//initialize & import routes directory
const blogRoutes = require('./routes/blogs');

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
app.use('/api/blogs', blogRoutes);

// app.get('/', (req, res) => res.send('API is running...'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});