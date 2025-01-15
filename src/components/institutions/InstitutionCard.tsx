import React from 'react';
import { Building2, Users, Mail, MapPin } from 'lucide-react';
import { Institution } from '../../types/institution';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

interface InstitutionCardProps {
  institution: Institution;
  onClick: (id: string) => void;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(institution.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{institution.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Building2 className="w-4 h-4 mr-1" />
            {institution.type.charAt(0).toUpperCase() + institution.type.slice(1)}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[institution.status]}`}>
          {institution.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {institution.city}, {institution.state}
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          {institution.contactEmail}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {institution.activeConnections} Active Connections
        </div>
      </div>

      <div className="mt-3 pt-3 border-t text-xs text-gray-500">
        Member since {new Date(institution.joinedDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default InstitutionCard;