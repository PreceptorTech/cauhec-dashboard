import React from 'react';
import { Filter } from 'lucide-react';
import { MilestoneFilter } from '../../types/milestone';

interface MilestoneFiltersProps {
  filters: MilestoneFilter;
  onFilterChange: (filters: MilestoneFilter) => void;
}

const MilestoneFilters: React.FC<MilestoneFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Filters</span>
        </div>
        
        <select 
          className="rounded-md border-gray-300 text-sm"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        
        <select
          className="rounded-md border-gray-300 text-sm"
          value={filters.institution}
          onChange={(e) => onFilterChange({ ...filters, institution: e.target.value })}
        >
          <option value="">All Institutions</option>
          <option value="hospital-a">Hospital A</option>
          <option value="hospital-b">Hospital B</option>
          <option value="clinic-c">Clinic C</option>
        </select>
      </div>
    </div>
  );
};

export default MilestoneFilters;