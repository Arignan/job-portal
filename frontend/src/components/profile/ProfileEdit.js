import React, { useState, useEffect } from 'react';
import { updateUserProfile, getUserProfile } from '../../services/authService';
//import { useNavigate } from 'react-router-dom'; // REMOVE THIS LINE

const ProfileEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  //const navigate = useNavigate(); // DELETE THIS LINE

  useEffect(() => {
    const fetchProfile = async () => {
        setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getUserProfile();
        setName(data.name || '');
        setEmail(data.email || '');
        // we can't get the file, but if you have the url, you can show it
        //setResume(data.resume || null);
        //setCoverLetter(data.coverLetter || '');
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true); // Set loading to true before API call
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('coverLetter', coverLetter);
      if (resume) {
        formData.append('resume', resume);
      }
      await updateUserProfile(formData);
      setSuccess(true);
      // Optionally redirect or show a success message
      //navigate('/profile');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
        setIsLoading(false); // Set loading to false after API call
    }
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {isLoading && <div>Loading...</div>} {/* Show loading indicator */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Profile updated successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="coverLetter">Cover Letter:</label>
          <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
        </div>
        <div>
          <label htmlFor="resume">Resume:</label>
          <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
        </div>
        <button type="submit" disabled={isLoading}> {/* Disable button while loading */}
            {isLoading ? 'Updating...' : 'Update Profile'} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
