import { useEffect, useState } from 'react';
import PageTemplate from '../../../layouts/PageTemplate';
import DashboardTopLevel from "./DashboardTopLevel";
import DashboardMain from "./DashboardMainContent";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(localStorage);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch operation data
        const recruitsResponse = await fetch(`${import.meta.env.VITE_JSON_SERVER}/recruits`);
        const recruitsData = await recruitsResponse.json();

        setData(recruitsData);
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
      // topLevelContent={
      //   loading ? <p>Loading...</p> : <DashboardTopLevel data={data} deconflictionData={deconflictionData} />
      // }
      mainContent={
        loading ? <p>Loading...</p> : <DashboardMain data={data}/>
      }
      isDashboard={true}
    />
  );
};

export default Dashboard;
