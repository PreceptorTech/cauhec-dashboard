import { User } from "./user";

export type ConnectionRole = "student" | "preceptor" | "coordinator";
export type ConnectionStatus = "pending" | "accepted" | "ignored";

export interface Connection {
  id: string;
  name: string;
  role: ConnectionRole;
  email: string;
  status: ConnectionStatus;
  institution: string;
  program: string;
  startDate: string;
  endDate?: string;
  lastActive: string;
  student: User;
  preceptor: User;
}

export interface ConnectionFilter {
  role?: ConnectionRole;
  status?: ConnectionStatus;
  institution?: string;
  program?: string;
}
