import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import ApplicationForm from '../components/applications/ApplicationForm';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getJobById(jobId);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchJob();
  }, [jobId]);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (isLoading || !job) return <div>Loading...</div>; // Show loading indicator 

  return (
    <div>
      <h2>{job.title}</h2>
      <p>Company: {job.company}</p>
      <p>Description: {job.description}</p>
      <p>Salary: {job.salary}</p>
      <p>Requirements: {job.requirements}</p>
      <ApplicationForm />
      <Link to="/jobs">Back to Jobs</Link>
    </div>
  );
};

export default JobDetails;
