//JWT verification, role checks

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
console.log('authMiddleware started');
// Get token from header
const token = req.header('x-auth-token');

// Check if no token
if (!token) {
    console.log('No token, authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
}

// Verify token
try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded.user; // Correct! This must be 'decoded.user'
    console.log('Token verified');
    next();
} catch (err) {
     console.log('Token is not valid');
    res.status(401).json({ message: 'Token is not valid' });
}
 console.log('authMiddleware completed');
};
