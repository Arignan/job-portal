import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/authService'; // Import API function

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(); // Call the API
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Display other profile details */}
    </div>
  );
};

export default ProfileView;
