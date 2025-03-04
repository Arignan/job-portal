import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob, updateJob } from '../../services/jobService';

const JobForm = ({ isEdit = false, initialJob = null }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && initialJob) {
      setTitle(initialJob.title || '');
      setCompany(initialJob.company || '');
      setDescription(initialJob.description || '');
      setSalary(initialJob.salary || '');
      setRequirements(initialJob.requirements || '');
    }
  }, [isEdit, initialJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Set loading to true before API call
    const jobData = { title, company, description, salary, requirements };
    try {
      if (isEdit) {
        await updateJob(initialJob._id, jobData);
      } else {
        await createJob(jobData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create/update job');
    } finally {
      setIsLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Job' : 'Create Job'}</h2>
      {isLoading && <div>Loading...</div>} {/* Show loading indicator */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Input fields (title, company, description, salary, requirements) */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="requirements">Requirements:</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
            {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Job' : 'Create Job')} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
