//Job application schema

const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number },
  experience: { type: Number },
  skills: { type: [String] },
  education: { type: String },
  email: { type: String },
  phone: { type: String },
  resume: { type: String }, // File path or URL
  coverLetter: { type: String }, // File path or URL
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
