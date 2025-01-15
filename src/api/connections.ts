import axiosInstance from "./axiosConfig";
import { Connection } from "../types/connection";

interface ConnectionsResponse {
  status: string;
  data: {
    users: Array<{
      id: number;
      fullName: string;
      role: string;
      email: string;
      schoolName: string;
      workLocation: string;
      MajorClinicalProgramType: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export const getConnections = async (role: string = 'student'): Promise<Connection[]> => {
  try {
    const response = await axiosInstance.get<ConnectionsResponse>(
      `/admin/list-all-users?role=${role}`
    );

    // Transform the API response to match our Connection type
    return response.data.data.users.map((user) => ({
      id: user.id.toString(),
      name: user.fullName,
      role: user.role,
      email: user.email,
      status: "active",
      institution: user.schoolName || user.workLocation || "N/A",
      program: user.MajorClinicalProgramType || "N/A",
      startDate: new Date(user.createdAt).toISOString().split("T")[0],
      lastActive: user.updatedAt,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch connections: ${error.message}`);
    }
    throw new Error("Failed to fetch connections");
  }
};