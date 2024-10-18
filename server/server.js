const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors())
// Connect to MongoDB
connectDB();

// Init Middleware to handle JSON body data
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
