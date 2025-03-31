export interface StatData {
  count: number;
  change: string;
}

export interface DashboardStats {
  activeConnections: StatData;
  activeClinicalRotations: StatData;
  totalPreceptors: StatData;
  totalStudents: StatData;
}

export interface ComparisonData {
  month: string;
  preceptors: number;
  students: number;
}
