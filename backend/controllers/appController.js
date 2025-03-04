//Job application logic
const Application = require('../models/Application');


exports.createApplication = async (req, res) => {
  const { job, name, age, experience, skills, education, email, phone } = req.body;
  try {
    const newApplication = new Application({
      job,
      applicant: req.user.userId,
      name,
      age,
      experience,
      skills,
      education,
      email,
      phone,
      resume: req.files?.resume ? req.files.resume[0].path : '',
      coverLetter: req.files?.coverLetter ? req.files.coverLetter[0].path : ''
    });
    const application = await newApplication.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getApplicationsByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applications = await Application.find({ job: jobId });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
