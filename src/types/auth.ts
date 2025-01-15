export interface LoginResponse {
  status: string;
  data: {
    id: number;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    image: string | null;
    role: string;
    zipCode: string | null;
    city: string | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponse['data'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}