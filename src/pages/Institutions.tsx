import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus } from 'lucide-react';
import InstitutionHeader from '../components/institutions/InstitutionHeader';
import InstitutionFilters from '../components/institutions/InstitutionFilters';
import SchoolLocationCard from '../components/institutions/SchoolLocationCard';
import AddInstitutionModal from '../components/institutions/AddInstitutionModal';
import { InstitutionFilter } from '../types/institution';
import { getLocations, LocationOption } from '../api/options';

const ITEMS_PER_PAGE = 12;

const Institutions: React.FC = () => {
  const [filters, setFilters] = useState<InstitutionFilter>({
    type: 'schoolLocation',
    state: ''
  });
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [displayedLocations, setDisplayedLocations] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastLocationRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchLocations = async () => {
    if (!filters.state || !filters.type) {
      setLocations([]);
      setDisplayedLocations([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getLocations(filters.state, filters.type as 'schoolLocation' | 'worklocation');
      setLocations(data);
      setDisplayedLocations(data.slice(0, ITEMS_PER_PAGE));
      setHasMore(data.length > ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [filters.state, filters.type]);

  const loadMore = () => {
    const currentLength = displayedLocations.length;
    const nextItems = locations.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );
    
    if (nextItems.length > 0) {
      setDisplayedLocations(prev => [...prev, ...nextItems]);
      setHasMore(currentLength + nextItems.length < locations.length);
    } else {
      setHasMore(false);
    }
  };

  const handleAddSuccess = () => {
    fetchLocations();
  };

  // Create a unique key for each location
  const getLocationKey = (location: LocationOption, index: number) => {
    return `${location.id}-${location.value}-${index}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <InstitutionHeader />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#EF5157] text-white rounded-lg hover:bg-[#D64147] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Institution
        </button>
      </div>
      
      <InstitutionFilters filters={filters} onFilterChange={setFilters} />
      
      {loading && displayedLocations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!filters.state ? (
            <div className="text-center text-gray-500 mt-8">
              Please select a state to view locations
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedLocations.map((location, index) => (
                <div
                  key={getLocationKey(location, index)}
                  ref={index === displayedLocations.length - 1 ? lastLocationRef : null}
                >
                  <SchoolLocationCard location={location} />
                </div>
              ))}
            </div>
          )}
          
          {loading && displayedLocations.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
            </div>
          )}
        </>
      )}

      <AddInstitutionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default Institutions;