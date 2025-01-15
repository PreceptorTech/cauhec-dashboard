import axiosInstance from './axiosConfig';

export interface AddInstitutionData {
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

export const addInstitution = async (data: AddInstitutionData) => {
  try {
    const response = await axiosInstance.post('/admin/add-institution', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to add institution');
  }
};