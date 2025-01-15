interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  specialty: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentDetail extends BaseUser {
  schoolName: string;
  schoolLocation: string;
  clinicalHoursNeeded: number;
  majorClinicalProgramType: string;
  timeline: string;
  studentIdCard: string;
  studentTranscript: string;
  personalityAssessmentCode: string;
}

interface PreceptorDetail extends BaseUser {
  workLocation: string;
  clinicalRotationRate: string;
  licenseNumber: string;
  certificationNumber: string;
  idProof: string;
  affiliationAgreement: string;
  preceptorStatus: number;
  verificationId: string;
}

export interface ConnectionDetailResponse {
  status: string;
  data: {
    connectionDetails: StudentDetail | PreceptorDetail;
    connectedUsers: Array<StudentDetail | PreceptorDetail>;
  };
}

export type { StudentDetail, PreceptorDetail };