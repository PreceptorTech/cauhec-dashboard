import axiosInstance from "./axiosConfig";
import { Connection, ConnectionStatus } from "../types/connection";
import { User } from "../types/user";

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

interface AllConnectionsResponse {
  status: string;
  data: Array<{
    connection_status: string;
    connection_request_date: string;
    connection_date: string | null;
    student_name: string;
    student_id: number;
    student_email: string;
    preceptor_name: string;
    preceptor_id: number;
    preceptor_email: string;
  }>;
}



export const getAllConnections = async (): Promise<Connection[]> => {
  try {
    const response = await axiosInstance.get<AllConnectionsResponse>(
      "/admin/all-connections"
    );

    // Transform the API response to match our Connection type
    return response.data.data.map((connection) => ({
      id: connection.student_id.toString(),
      name: connection.student_name,
      role: "student",
      email: connection.student_email,
      status: connection.connection_status as ConnectionStatus,
      institution: "N/A", // These fields are not provided in the API response
      program: "N/A",
      startDate: connection.connection_request_date,
      lastActive:
        connection.connection_date || connection.connection_request_date,
      student: {
        id: connection.student_id.toString(),
        firstName: connection.student_name.split(" ")[0] || "",
        lastName: connection.student_name.split(" ").slice(1).join(" ") || "",
        email: connection.student_email,
        role: "student",
        createdAt: connection.connection_request_date,
      },
      preceptor: {
        id: connection.preceptor_id.toString(),
        firstName: connection.preceptor_name.split(" ")[0] || "",
        lastName: connection.preceptor_name.split(" ").slice(1).join(" ") || "",
        email: connection.preceptor_email,
        role: "preceptor",
        createdAt: connection.connection_request_date,
      },
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch all connections: ${error.message}`);
    }
    throw new Error("Failed to fetch all connections");
  }
};
