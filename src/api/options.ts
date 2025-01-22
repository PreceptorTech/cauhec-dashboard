import axiosInstance from './axiosConfig';

export interface SchoolLocation {
  id: number;
  value: string;
  locationType: string;
  phone: string;
  collegeName: string;
  adminName: string;
  adminPhone: string;
  adminEmail: string;
  fax: string;
  dapipId: string;
  opeId: string;
  ipedsUnitIds: string;
  parentName: string;
  parentDapipId: string;
}

export interface WorkLocation {
  id: number;
  value: string;
  CCN: number | null;
  hospital: string;
  city: string;
  state: string;
  zipCode: number;
  county: string;
  phone: string;
  cmsRegion: number | null;
  ownershipType: string;
  certificationDate: string | null;
  beds: number | null;
}

export interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface LocationResponse<T> {
  status: string;
  data: {
    institutions: T[];
    pagination: PaginationData;
  };
}

export interface StateOption {
  id: number;
  value: string;
  abbreviation: string;
}

export const getStates = async (): Promise<StateOption[]> => {
  try {
    const response = await axiosInstance.get('/option', {
      params: { type: 'state' }
    });
    return response.data.data.options;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }
    throw new Error('Failed to fetch states');
  }
};

export const getSchoolLocations = async (
  stateAbbr: string, 
  page: number = 1,
  limit: number = 12,
  searchQuery?: string
): Promise<LocationResponse<SchoolLocation>> => {
  try {
    const response = await axiosInstance.get('/option', {
      params: { 
        type: 'schoolLocation',
        state: stateAbbr,
        page,
        limit,
        name: searchQuery,
        newFeature: 1
      }
    });
    
    return {
      status: response.data.status,
      data: {
        institutions: response.data.data.options || [],
        pagination: response.data.data.pagination
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch school locations: ${error.message}`);
    }
    throw new Error('Failed to fetch school locations');
  }
};

export const getWorkLocations = async (
  stateAbbr: string, 
  page: number = 1,
  limit: number = 12,
  searchQuery?: string
): Promise<LocationResponse<WorkLocation>> => {
  try {
    const response = await axiosInstance.get('/option', {
      params: { 
        type: 'worklocation',
        state: stateAbbr,
        page,
        limit,
        name: searchQuery,
        newFeature: 1
      }
    });
    
    return {
      status: response.data.status,
      data: {
        institutions: response.data.data.options || [],
        pagination: response.data.data.pagination
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch work locations: ${error.message}`);
    }
    throw new Error('Failed to fetch work locations');
  }
};