import React, { useEffect, useState } from 'react';
import FilterableTable from '../../../components/Tables/Tables';
import { Button } from "@trussworks/react-uswds";
import KnowledgeGraph from './Charts/KnowledgeGraph';

interface Recruit {
  id: number;
  first_name: string;
  middle_initial: string;
  last_name: string;
  rank: string;
  uic: string;
}

interface Operation {
  // Define your Operation type here if needed
}

interface DashboardMainProps {
  data: Recruit[];   // If you are actually passing a list of recruits here
  deconflictionData?: any[]; // Adjust as needed
}

const DashboardMain: React.FC<DashboardMainProps> = ({ data }) => {
  const [extractedData, setExtractedData] = useState<Recruit[]>([]);
  const [activeView, setActiveView] = useState<'recruits' | 'assessments'>('recruits');

  const extractData = (recruits: Recruit[]) => {
    return recruits.map((recruit) => ({
      id: recruit.id,
      firstname: recruit.first_name,
      middleinitial: recruit.middle_initial,
      lastname: recruit.last_name,
      rank: recruit.rank,
      unit: recruit.uic,
    }));
  };

  useEffect(() => {
    if (data) {
      setExtractedData(extractData(data));
    }
  }, [data]);
  const userAssessmentInfo = localStorage.getItem('user-milid');
  const foundItem = data.find(item => item.id === userAssessmentInfo);
  console.log(foundItem)
  
  return (
    <>
      <h2>Dashboard</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        {/* Disable the button for the currently active view */}
        <Button
          variant="contained"
          disabled={activeView === 'recruits'}
          onClick={() => setActiveView('recruits')}
        >
          Recruits
        </Button>
        {' '}
        <Button
          variant="contained"
          disabled={activeView === 'assessments'}
          onClick={() => setActiveView('assessments')}
        >
          Assessments 360
        </Button>
      </div>

      {/* Conditionally render content based on the active view */}
      {activeView === 'recruits' ? (
        <>
        <h2>Recruits</h2>
        <FilterableTable data={data} />
        </>
      ) : (
        <KnowledgeGraph recruits={data} />
      )}
    </>
  );
};

export default DashboardMain;
