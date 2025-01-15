import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { InstitutionFilter } from '../../types/institution';
import { getStates, StateOption } from '../../api/options';

interface InstitutionFiltersProps {
  filters: InstitutionFilter;
  onFilterChange: (filters: InstitutionFilter) => void;
}

const InstitutionFilters: React.FC<InstitutionFiltersProps> = ({ filters, onFilterChange }) => {
  const [states, setStates] = useState<StateOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateOptions = await getStates();
        setStates(stateOptions);
      } catch (error) {
        console.error('Failed to fetch states:', error);
        setStates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Filters</span>
        </div>
        
        <select 
          className="rounded-md border-gray-300 text-sm"
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value as any })}
        >
          <option value="schoolLocation">School Locations</option>
          <option value="worklocation">Work Locations</option>
        </select>

        <select
          className="rounded-md border-gray-300 text-sm"
          value={filters.state}
          onChange={(e) => onFilterChange({ ...filters, state: e.target.value })}
          disabled={loading}
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state.id} value={state.abbreviation}>
              {state.value} ({state.abbreviation})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InstitutionFilters;