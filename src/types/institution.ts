export type InstitutionType = 'hospital' | 'clinic' | 'university' | 'other';
export type InstitutionStatus = 'active' | 'inactive' | 'pending';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  status: InstitutionStatus;
  address: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  activeConnections: number;
  joinedDate: string;
}

export interface InstitutionFilter {
  type?: InstitutionType;
  status?: InstitutionStatus;
  state?: string;
}