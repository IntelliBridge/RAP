import { useEffect, useState } from 'react';
import FilterableTable from '../../../components/Tables/Tables';

type Vendor = {
  UEI: string;
};

type OperationLocation = {
  city: string;
  state: string;
};

type Operation = {
  id: string;
  submission_id: string;
  submission_date: string;
  status: string;
  operation_name: string;
  vendors: Vendor[];
  operation_location: OperationLocation;
};

interface DashboardMainProps {
  data: Operation[];
  deconflictionData: any[]; // Adjust this type according to the actual structure if used later
}

const DashboardMain: React.FC<DashboardMainProps> = ({ data }) => {
  const extractData = (data: Operation[]) => {
    return data.map(operation => ({
      id: operation.id,
      submission_id: operation.submission_id,
      submission_date: operation.submission_date,
      status: operation.status,
      operation_name: operation.operation_name,
      vendors: operation.vendors ? operation.vendors.map(vendor => vendor.UEI) : [],
      city: operation.operation_location ? operation.operation_location.city : '',
      state: operation.operation_location ? operation.operation_location.state : ''
    }));
  };

  const [extractedData, setExtractedData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setExtractedData(extractData(data));
    }
  }, [data]);

  return (
    <>
      <h2>Operation</h2>
      <FilterableTable data={extractedData} />
    </>
  );
};

export default DashboardMain;
