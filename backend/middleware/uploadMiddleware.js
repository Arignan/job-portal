//Configure file uploads (Multer)

const multer = require('multer');
const path = require('path');

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your backend root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = function (req, file, cb) {
  // Accept all file types for now; add validations if needed
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
