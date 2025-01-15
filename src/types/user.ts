export interface BaseUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
}

export interface Student extends BaseUser {
  program: string;
  year: number;
  institution: string;
  preceptor: string;
}

export interface Preceptor extends BaseUser {
  specialty: string;
  institution: string;
  studentsCount: number;
  yearsOfExperience: number;
}