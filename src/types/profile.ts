export interface Profile {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ProfileUpdateData {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}