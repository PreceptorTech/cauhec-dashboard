import React from 'react';

interface UserHeaderProps {
  activeTab: 'student' | 'preceptor';
}

const UserHeader: React.FC<UserHeaderProps> = ({ activeTab }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      <p className="text-gray-500 mt-1">
        Manage {activeTab === 'student' ? 'students' : 'preceptors'} in the system
      </p>
    </div>
  );
};

export default UserHeader;