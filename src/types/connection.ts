export type ConnectionRole = 'student' | 'preceptor' | 'coordinator';
export type ConnectionStatus = 'active' | 'pending' | 'completed' | 'inactive';

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
}

export interface ConnectionFilter {
  role?: ConnectionRole;
  status?: ConnectionStatus;
  institution?: string;
  program?: string;
}