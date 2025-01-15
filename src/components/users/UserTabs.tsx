import React from 'react';
import { GraduationCap, Stethoscope } from 'lucide-react';

interface UserTabsProps {
  activeTab: 'student' | 'preceptor';
  onTabChange: (tab: 'student' | 'preceptor') => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex space-x-2">
      <button
        onClick={() => onTabChange('student')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'student'
            ? 'bg-[#FFF1F1] text-[#EF5157]'
            : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        <GraduationCap className="w-5 h-5" />
        Students
      </button>
      <button
        onClick={() => onTabChange('preceptor')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'preceptor'
            ? 'bg-[#FFF1F1] text-[#EF5157]'
            : 'text-gray-500 hover:bg-gray-50'
        }`}
      >
        <Stethoscope className="w-5 h-5" />
        Preceptors
      </button>
    </div>
  );
};

export default UserTabs;