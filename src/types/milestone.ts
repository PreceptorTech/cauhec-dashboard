export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: string;
  institution: string;
  stipendAmount?: number;
}

export interface MilestoneFilter {
  status?: string;
  institution?: string;
  dateRange?: [Date, Date];
}