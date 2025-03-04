//Routes for job applications

const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Use upload.fields for handling multiple file uploads (resume and cover letter)
// Apply upload middleware to the route
router.post(
'/',
upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]), // <-- upload.fields() FIRST!
 authMiddleware,
appController.createApplication
);

router.get('/job/:jobId', authMiddleware, appController.getApplicationsByJob);

module.exports = router;
