import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { getAllJobs } from '../../services/jobService';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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

  return (
    <div>
      {isLoading && <div>Loading jobs...</div>} {/* Display loading indicator */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>Available Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
