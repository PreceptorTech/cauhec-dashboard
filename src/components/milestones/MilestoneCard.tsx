import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Milestone } from '../../types/milestone';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

interface MilestoneCardProps {
  milestone: Milestone;
  onClick: (id: string) => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(milestone.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">{milestone.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[milestone.status]}`}>
          {milestone.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{milestone.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(milestone.dueDate).toLocaleDateString()}
        </div>
        {milestone.stipendAmount && (
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {milestone.stipendAmount.toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">{milestone.institution}</span>
        <span className="text-sm text-gray-500">{milestone.assignedTo}</span>
      </div>
    </div>
  );
};

export default MilestoneCard;