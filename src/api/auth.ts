import axiosInstance from './axiosConfig';
import { LoginResponse } from '../types/auth';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/admin/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    // Create a new error with just the message to avoid cloning issues
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Login failed. Please check your credentials and try again.');
  }
};