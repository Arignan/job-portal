//Environment variables & configuration

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/jobPortal',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret'
};
