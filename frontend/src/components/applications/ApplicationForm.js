import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applyToJob } from '../../services/appService';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { jobId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Set loading to true before API call
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('coverLetter', coverLetter);
      if (resume) {
        formData.append('resume', resume);
      }
      await applyToJob(jobId, formData);
      navigate('/jobs');
    } catch (err) {
      setError('Application failed');
    } finally {
      setIsLoading(false); // Set loading to false after API call
    }
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="coverLetter">Cover Letter:</label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="resume">Resume:</label>
        <input
          type="file"
          id="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
        />
      </div>
      <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
        {isLoading ? 'Applying...' : 'Apply'} {/* Show loading text */}
      </button>
    </form>
  );
};

export default ApplicationForm;
