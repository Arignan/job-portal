//Job posting CRUD operations

const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { jobTitle, companyName, description, salary, requirements, skills } = req.body;
  try {
    const newJob = new Job({
      jobTitle,
      companyName,
      description,
      salary,
      requirements,
      skills,
      postedBy: req.user.userId
    });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateJob = async (req, res) => {
  const { jobTitle, companyName, description, salary, requirements, skills, status } = req.body;
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user.userId)
      return res.status(401).json({ message: 'User not authorized' });

    const jobFields = { jobTitle, companyName, description, salary, requirements, skills, status };
    job = await Job.findByIdAndUpdate(req.params.id, { $set: jobFields }, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user.userId)
      return res.status(401).json({ message: 'User not authorized' });

    await job.remove();
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
