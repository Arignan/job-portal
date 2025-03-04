import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/JobCard.css'; // Import the CSS file

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="description">{job.description.substring(0, 100)}...</p> {/* Limit description length */}
      <Link to={`/jobs/${job._id}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
