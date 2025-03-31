export interface BaseUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinDate: string;
  lastActive: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  schoolName?: string;
  workLocation?: string;
  createdAt: string;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  specialty: string;
  createdAt: string;
  preceptorStatus: string;
  workLocation: string | null;
  schoolName: string;
  schoolLocation: string;
  city: string | null;
  zipCode: string | null;
  Linkdin_url: string;
  bio: string;
  timeline: string | null;
  designation: string;
  studentIdCard: string;
  studentTranscript: string | null;
  rating: number | null;
  experience: string | null;
  clinicalRole: string;
  numberOfClinicalHoursNeeded: string | null;
  majorClinicalProgramType: string | null;
  affilationAggrement: string;
  personalityAssessmentCode: string | null;
  image: string;
  licenseNumber: string;
  certificationNumber: string;
  subscribeStatus: string;
  verificationId: string;
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
