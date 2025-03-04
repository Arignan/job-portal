import React from 'react';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';

const ProfilePage = () => {
  return (
    <div>
        <ProfileView/>
        <ProfileEdit/>
    </div>
  );
};

export default ProfilePage;
