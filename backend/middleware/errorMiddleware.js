//Global error handler
const errorMiddleware = (err, req, res, next) => {
    // Log the error details to the server console. This is crucial for debugging!
    console.error("Error handler:", err.stack);
  
    // Determine the status code. If it's already set (e.g., in authMiddleware), use that.
    // Otherwise, default to 500 (Internal Server Error).
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    // Send a JSON response. Include the error message (and stack trace in development).
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
  
module.exports = errorMiddleware;
  
  