import React, { useState, useEffect } from 'react';
import { getAllJobs, deleteJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs.');
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    navigate('/edit', { state: { job } });
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (e) {
      setError('Failed to delete job');
    }
  };

  return (
    <div>
      <h2>Job Poster Dashboard</h2>
      {isLoading && <div>Loading jobs...</div>} {/* Display loading indicator */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => navigate('/create')}>Create Job</button>
      <div>
        <h3>Your Jobs</h3>
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              {job.title} - {job.company}
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
