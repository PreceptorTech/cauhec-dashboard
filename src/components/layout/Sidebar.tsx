import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  UserCircle,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-[#EF5157] text-white p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold">CAUHEC Connect</h1>
        <p className="text-sm text-red-100">Admin Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-[#D64147]' : 'hover:bg-[#D64147]'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-[#D64147]' : 'hover:bg-[#D64147]'
            }`
          }
        >
          <UserCircle size={20} />
          <span>Users</span>
        </NavLink>
        
        <NavLink
          to="/connections"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-[#D64147]' : 'hover:bg-[#D64147]'
            }`
          }
        >
          <Users size={20} />
          <span>Connections</span>
        </NavLink>
        
        <NavLink
          to="/institutions"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-[#D64147]' : 'hover:bg-[#D64147]'
            }`
          }
        >
          <Building2 size={20} />
          <span>Institutions</span>
        </NavLink>

        <NavLink
          to="/profiles"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-[#D64147]' : 'hover:bg-[#D64147]'
            }`
          }
        >
          <Settings size={20} />
          <span>Profiles</span>
        </NavLink>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#D64147] w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;