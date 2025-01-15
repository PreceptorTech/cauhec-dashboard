import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Building2, GraduationCap } from 'lucide-react';
import { Connection } from '../../types/connection';

interface ConnectionCardProps {
  connection: Connection;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ connection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/connections/${connection.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{connection.name}</h3>
          <p className="text-sm text-gray-500">{connection.email}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <GraduationCap className="w-4 h-4 mr-2" />
          {connection.role.charAt(0).toUpperCase() + connection.role.slice(1)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          {connection.institution}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {new Date(connection.startDate).toLocaleDateString()}
          {connection.endDate && ` - ${new Date(connection.endDate).toLocaleDateString()}`}
        </div>
      </div>

      <div className="text-xs text-gray-500 border-t pt-2">
        Last active: {new Date(connection.lastActive).toLocaleString()}
      </div>
    </div>
  );
};

export default ConnectionCard;