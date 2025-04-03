import React from "react";
import { Filter } from "lucide-react";

interface ConnectionFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const ConnectionFilters: React.FC<ConnectionFiltersProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Filters</span>
        </div>

        <select
          className="rounded-md border-gray-300 text-sm"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="ignored">Ignored</option>
        </select>
      </div>
    </div>
  );
};

export default ConnectionFilters;
