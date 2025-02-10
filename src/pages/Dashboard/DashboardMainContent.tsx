import { useEffect, useState } from 'react';
import FilterableTable from '../../../components/Tables/Tables';

type Vendor = {
  UEI: string;
};

type OperationLocation = {
  city: string;
  state: string;
};

type Recruit = {
  id: number;
  firstname: string;
  middleinitial: string;
  lastname: string;
  rank: string;
  unit: number;
};

interface DashboardMainProps {
  data: Operation[];
  deconflictionData: any[]; // Adjust this type according to the actual structure if used later
}

const DashboardMain: React.FC<DashboardMainProps> = ({ data }) => {
  const extractData = (data: Recruit[]) => {
    return data.map(recruit => ({
      id: recruit.id,
      firstname: recruit.first_name,
      middleinitial: recruit.middle_initial,
      lastname: recruit.last_name,
      rank: recruit.rank,
      unit: recruit.uic
    }));
  };

  const [extractedData, setExtractedData] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setExtractedData(extractData(data));
    }
  }, [data]);

console.log(extractData(data))

  return (
    <>
      <h2>Recruits</h2>
      <FilterableTable data={data} />
    </>
  );
};

export default DashboardMain;
