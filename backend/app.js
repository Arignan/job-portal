// backend/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Define API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/appRoutes'));

// Error handling middleware (should be added after routes)
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

module.exports = app;
