//Job posting schema

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  requirements: { type: String, required: true },
  skills: { type: [String], required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Job', JobSchema);
