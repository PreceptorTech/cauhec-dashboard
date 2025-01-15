import axiosInstance from './axiosConfig';
import { Profile, ProfileUpdateData, ApiResponse } from '../types/profile';

export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Profile[]>>('/admin/profiles');
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
    throw new Error('Failed to fetch profiles');
  }
};

export const updateProfile = async (id: number, data: ProfileUpdateData): Promise<ApiResponse<Profile>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Profile>>(
      `/admin/profiles/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
    throw new Error('Failed to update profile');
  }
};