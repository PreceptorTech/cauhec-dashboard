import axiosInstance from './axiosConfig';

export interface LocationOption {
  id: number;
  value: string;
  locationType: string;
  phone: string;
  collegeName: string;
  adminName: string;
  adminPhone: string;
  adminEmail: string;
  ParentName: string;
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

export const getLocations = async (stateAbbr: string, type: 'schoolLocation' | 'worklocation'): Promise<LocationOption[]> => {
  try {
    const response = await axiosInstance.get('/option', {
      params: { 
        type,
        state: stateAbbr
      }
    });
    return response.data.data.options;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }
    throw new Error('Failed to fetch locations');
  }
};