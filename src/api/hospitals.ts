import axiosInstance from './axiosConfig';

export interface AddHospitalData {
  value: string;
  CCN: string;
  hospital: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  phone: string;
  cmsRegion: string;
  ownershipType: string;
  certificationDate: string;
  beds: number;
}

export const addHospital = async (data: AddHospitalData) => {
  try {
    const response = await axiosInstance.post('/admin/add-work-location', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to add hospital');
  }
};