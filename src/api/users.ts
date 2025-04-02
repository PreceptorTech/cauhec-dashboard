import axiosInstance from "./axiosConfig";
import { User, UserDetails } from "../types/user";

export const getUsers = async (
  role: "student" | "preceptor"
): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/admin/users-list", {
      params: { role },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserDetail = async (id: string): Promise<UserDetails> => {
  try {
    const response = await axiosInstance.get("/admin/view-user", {
      params: { id },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user detail:", error);
    throw error;
  }
};

export const uploadCsv = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await axiosInstance.post("/public/csvupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload CSV: ${error.message}`);
    }
    throw new Error("Failed to upload CSV");
  }
};
