import axiosInstance from './axiosConfig';
import { User, UserDetailResponse } from '../types/user';

export const getUsers = async (role: 'student' | 'preceptor'): Promise<User[]> => {
  try {
    const response = await axiosInstance.get('/admin/users-list', {
      params: { role }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserDetail = async (id: string): Promise<UserDetailResponse> => {
  try {
    const response = await axiosInstance.get('/admin/view-user', {
      params: { id }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user detail:', error);
    throw error;
  }
};