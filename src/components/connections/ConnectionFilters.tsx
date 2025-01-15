import React from 'react';
import { Filter } from 'lucide-react';
import { ConnectionFilter, ConnectionRole } from '../../types/connection';

interface ConnectionFiltersProps {
  filters: ConnectionFilter;
  onFilterChange: (filters: ConnectionFilter) => void;
}

const ConnectionFilters: React.FC<ConnectionFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Filters</span>
        </div>
        
        <select 
          className="rounded-md border-gray-300 text-sm"
          value={filters.role}
          onChange={(e) => onFilterChange({ ...filters, role: e.target.value as ConnectionRole })}
        >
          <option value="student">Students</option>
          <option value="preceptor">Preceptors</option>
        </select>
      </div>
    </div>
  );
};

export default ConnectionFilters;