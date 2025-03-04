//Express server initialization

// backend/server.js
const config = require('./config/config');
const connectDB = require('./config/db');
const cors = require('cors');
const app = require('./app'); // Import the app instance from app.js

// Connect to MongoDB
connectDB();

// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
