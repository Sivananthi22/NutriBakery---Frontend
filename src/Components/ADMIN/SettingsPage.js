import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Import AdminSidebar

const SettingsPage = () => {
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
  });

  const handleChange = (e) => {
    setAdminProfile({
      ...adminProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Profile saved:', adminProfile);
  };

  return (
    <div className="settings-page">
      <AdminSidebar /> {/* Include AdminSidebar */}
      <div className="main-content">
        <header>
          <h1>Settings</h1>
        </header>

        <div className="settings-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={adminProfile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={adminProfile.email}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
