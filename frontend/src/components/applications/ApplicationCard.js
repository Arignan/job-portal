import React from 'react';

const ApplicationCard = ({ application }) => {
    return (
        <div className="application-card">
            <h3>Applicant: {application.applicantName}</h3>
            <p>Email: {application.applicantEmail}</p>
            {/* Display other application details */}
        </div>
    );
};

export default ApplicationCard;
