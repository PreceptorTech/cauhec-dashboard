import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6 fixed top-0 right-0 left-64">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
          {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'A'}
        </div>
        <div>
          <p className="text-sm font-medium">{user?.fullName || user?.email || 'Admin User'}</p>
          <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;