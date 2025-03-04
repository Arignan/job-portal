// MongoDB connection using Mongoose

const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    // Removed useNewUrlParser and useUnifiedTopology as they are deprecated in the current driver.
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('DB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

