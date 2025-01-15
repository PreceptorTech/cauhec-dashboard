import axiosInstance from './axiosConfig';
import type { ConnectionDetailResponse } from '../types/connectionDetail';

export const getConnectionDetail = async (id: string): Promise<ConnectionDetailResponse> => {
  try {
    const response = await axiosInstance.get<ConnectionDetailResponse>('/admin/connection-details', {
      params: { id }
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch connection details: ${error.message}`);
    }
    throw new Error('Failed to fetch connection details');
  }
};