import axiosInstance from './axiosConfig';
import { DashboardStats, ComparisonData } from '../types/dashboard';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axiosInstance.get('/admin/stats');
    return response.data.data;
  } catch (error) {
    // Create a new error with just the message to avoid cloning issues
    if (error instanceof Error) {
      throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
    }
    throw new Error('Failed to fetch dashboard stats');
  }
};

export const getPreceptorsVsStudents = async (): Promise<ComparisonData[]> => {
  try {
    const response = await axiosInstance.get('/admin/preceptors-vs-students');
    return response.data.data.collectiveData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch comparison data: ${error.message}`);
    }
    throw new Error('Failed to fetch comparison data');
  }
};