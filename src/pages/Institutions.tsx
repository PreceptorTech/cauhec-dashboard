import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import InstitutionHeader from '../components/institutions/InstitutionHeader';
import InstitutionFilters from '../components/institutions/InstitutionFilters';
import SchoolLocationCard from '../components/institutions/SchoolLocationCard';
import AddInstitutionModal from '../components/institutions/AddInstitutionModal';
import AddHospitalModal from '../components/institutions/AddHospitalModal';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/institutions/SearchBar';
import { InstitutionFilter } from '../types/institution';
import { 
  getSchoolLocations, 
  getWorkLocations, 
  SchoolLocation, 
  WorkLocation, 
  PaginationData 
} from '../api/options';

const ITEMS_PER_PAGE = 12;

const Institutions: React.FC = () => {
  const [filters, setFilters] = useState<InstitutionFilter>({
    type: 'schoolLocation',
    state: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<(SchoolLocation | WorkLocation)[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddInstitutionModalOpen, setIsAddInstitutionModalOpen] = useState(false);
  const [isAddHospitalModalOpen, setIsAddHospitalModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE
  });

  const fetchLocations = useCallback(async (page: number = 1) => {
    if (!filters.state) {
      setLocations([]);
      setPagination({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: ITEMS_PER_PAGE
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response;
      if (filters.type === 'schoolLocation') {
        response = await getSchoolLocations(filters.state, page, ITEMS_PER_PAGE, searchQuery);
      } else {
        response = await getWorkLocations(filters.state, page, ITEMS_PER_PAGE, searchQuery);
      }

      setLocations(response.data.institutions);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      setLocations([]);
      setPagination({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: ITEMS_PER_PAGE
      });
    } finally {
      setLoading(false);
    }
  }, [filters.state, filters.type, searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchLocations(1);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters.state, filters.type, searchQuery, fetchLocations]);

  const handlePageChange = (page: number) => {
    fetchLocations(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddSuccess = () => {
    fetchLocations(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <InstitutionHeader />
        <button
          onClick={() => filters.type === 'schoolLocation' 
            ? setIsAddInstitutionModalOpen(true) 
            : setIsAddHospitalModalOpen(true)
          }
          className="flex items-center gap-2 px-4 py-2 bg-[#EF5157] text-white rounded-lg hover:bg-[#D64147] transition-colors"
        >
          <Plus className="w-5 h-5" />
          {filters.type === 'schoolLocation' ? 'Add Institution' : 'Add Hospital'}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <InstitutionFilters filters={filters} onFilterChange={setFilters} />
          <div className="md:ml-auto">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${filters.type === 'schoolLocation' ? 'schools' : 'hospitals'}...`}
            />
          </div>
        </div>
      </div>
      
      {loading && locations.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse h-[320px]">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          ))}
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[50vh]">
                {locations.map((location) => (
                  <SchoolLocationCard 
                    key={location.id} 
                    location={location} 
                    type={filters.type}
                  />
                ))}
              </div>

              {pagination.totalPages > 0 && (
                <div className="mt-8 space-y-4">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                  <div className="text-center text-sm text-gray-500">
                    Showing {locations.length} of {pagination.totalItems} locations
                  </div>
                </div>
              )}

              {locations.length === 0 && !loading && (
                <div className="text-center text-gray-500 mt-8">
                  No locations found for the selected filters
                </div>
              )}
            </>
          )}
        </>
      )}

      <AddInstitutionModal
        isOpen={isAddInstitutionModalOpen}
        onClose={() => setIsAddInstitutionModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <AddHospitalModal
        isOpen={isAddHospitalModalOpen}
        onClose={() => setIsAddHospitalModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default Institutions;