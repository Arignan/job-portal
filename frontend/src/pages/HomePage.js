import React from 'react';
import JobList from '../components/jobs/JobList';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Job Portal!</h2>
      <p>Find your dream job here.</p>
      <JobList /> {/* Display the list of available jobs */}
    </div>
  );
};

export default HomePage;
