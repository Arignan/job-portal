// backend/tests/api.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

beforeAll(async () => {
    // Connect to the test database.
    await mongoose.connect(process.env.MONGO_TEST_URI);
  // Optionally, use a separate test database.
  // Ensure your test database connection string is set in your .env file.
});

afterAll(async () => {
  // Clean up: Remove all collections created during tests if needed.
  await User.deleteMany({});
  await Job.deleteMany({});
  await Application.deleteMany({});
  await mongoose.connection.close();
});

describe('Authentication API', () => {
  const userData = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: 'jobSeeker'
  };

  it('should fail to signup a user with the same email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);
      expect(res.statusCode).toEqual(400); // Or whatever error code you return
  });
  
  it('should fail to login a user with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: 'wrongpassword' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg') // if you send back a message
  });
  
});

describe('Job API', () => {
  let token = '';
  let jobId = '';
  const jobData = {
    jobTitle: 'Software Developer',
    companyName: 'Tech Corp',
    description: 'Develop amazing apps',
    salary: 100000,
    requirements: 'Strong coding skills',
    skills: ['JavaScript', 'Node.js']
  };

  beforeAll(async () => {
    // Create a job poster user and log in to get token.
    const posterData = {
      name: 'Poster User',
      email: 'poster@example.com',
      password: 'password123',
      role: 'jobPoster'
    };
    await request(app).post('/api/auth/signup').send(posterData);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: posterData.email, password: posterData.password });
    token = res.body.token;
  });

  it('should create a job posting', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('x-auth-token', token)
      .send(jobData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    jobId = res.body._id;
  });

  it('should get job postings for the poster', async () => {
    const res = await request(app)
      .get('/api/jobs')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('Application API', () => {
  let jobId = '';
  let token = '';
  let applicationId = '';

  beforeAll(async () => {
    // Create a job poster and post a job
    const posterData = {
      name: 'Poster2',
      email: 'poster2@example.com',
      password: 'password123',
      role: 'jobPoster'
    };
    await request(app).post('/api/auth/signup').send(posterData);
    const posterLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: posterData.email, password: posterData.password });
    const posterToken = posterLogin.body.token;

    const jobData = {
      jobTitle: 'QA Engineer',
      companyName: 'Quality Inc.',
      description: 'Test and ensure quality',
      salary: 70000,
      requirements: 'Attention to detail',
      skills: ['Testing', 'Automation']
    };
    const jobRes = await request(app)
      .post('/api/jobs')
      .set('x-auth-token', posterToken)
      .send(jobData);
    jobId = jobRes.body._id;

    // Create a job seeker and log in
    const seekerData = {
      name: 'Seeker',
      email: 'seeker@example.com',
      password: 'password123',
      role: 'jobSeeker'
    };
    await request(app).post('/api/auth/signup').send(seekerData);
    const seekerLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: seekerData.email, password: seekerData.password });
    token = seekerLogin.body.token;
  });

  it('should create a job application', async () => {
    const applicationData = {
      job: jobId,
      name: 'Applicant Name',
      age: 30,
      experience: 5,
      skills: ['Testing'],
      education: 'Bachelor',
      email: 'applicant@example.com',
      phone: '1234567890'
    };

    // Using Supertest’s ability to handle file uploads with .field() for form-data.
    const res = await request(app)
      .post('/api/applications')
      .set('x-auth-token', token)
      .field('job', applicationData.job)
      .field('name', applicationData.name)
      .field('age', applicationData.age)
      .field('experience', applicationData.experience)
      .field('education', applicationData.education)
      .field('email', applicationData.email)
      .field('phone', applicationData.phone)
      .field('skills', applicationData.skills);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    applicationId = res.body._id;
  });

  it('should get applications for a job posting', async () => {
    const res = await request(app)
      .get(`/api/applications/job/${jobId}`)
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
