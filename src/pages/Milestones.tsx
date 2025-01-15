import React, { useState } from 'react';
import MilestoneHeader from '../components/milestones/MilestoneHeader';
import MilestoneFilters from '../components/milestones/MilestoneFilters';
import MilestoneCard from '../components/milestones/MilestoneCard';
import { Milestone, MilestoneFilter } from '../types/milestone';

// Mock data
const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Complete Clinical Rotation',
    description: 'Finish the required clinical rotation hours at Hospital A under Dr. Smith',
    dueDate: '2024-04-15',
    status: 'in_progress',
    assignedTo: 'John Doe',
    institution: 'Hospital A',
    stipendAmount: 2500,
  },
  {
    id: '2',
    title: 'Submit Research Paper',
    description: 'Complete and submit the research paper on patient care improvements',
    dueDate: '2024-05-01',
    status: 'pending',
    assignedTo: 'Jane Smith',
    institution: 'Hospital B',
    stipendAmount: 1500,
  },
];

const Milestones: React.FC = () => {
  const [filters, setFilters] = useState<MilestoneFilter>({});

  const handleMilestoneClick = (id: string) => {
    console.log('View milestone:', id);
  };

  return (
    <div>
      <MilestoneHeader />
      <MilestoneFilters filters={filters} onFilterChange={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMilestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onClick={handleMilestoneClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Milestones;