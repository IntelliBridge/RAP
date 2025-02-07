import { useEffect, useState } from 'react';
import PageTemplate from '../../../layouts/PageTemplate';
import DashboardTopLevel from "./DashboardTopLevel";
import DashboardMain from "./DashboardMainContent";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deconflictionData, setDeconflictionData] = useState([]);
  console.log(localStorage.getItem('user'));
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch operation data
        const operationResponse = await fetch(`${import.meta.env.VITE_JSON_SERVER}/operations`);
        const operationData = await operationResponse.json();

        // Fetch conflict data
        const conflictResponse = await fetch(`${import.meta.env.VITE_JSON_SERVER}/operations-conflicts/`);
        const conflictData = await conflictResponse.json();

        setData(operationData);
        setDeconflictionData(conflictData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageTemplate
      topLevelContent={
        loading ? <p>Loading...</p> : <DashboardTopLevel data={data} deconflictionData={deconflictionData} />
      }
      mainContent={
        loading ? <p>Loading...</p> : <DashboardMain data={data} deconflictionData={deconflictionData} />
      }
      isDashboard={true}
    />
  );
};

export default Dashboard;
