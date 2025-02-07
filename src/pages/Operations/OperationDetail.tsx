import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OperationDetail.scss";
import PageTemplate from "../../../layouts/PageTemplate";
import OperationDetailMain from "./OperationDetailMainContent";
import OperationDetailSideInfo from "./OperationDetailSideBar";
import { Operation, DeconflictionData, OperationData } from "./types";
import { Grid } from "@trussworks/react-uswds";
import Deconfliction from "./Deconfliction/Deconfliction";

import Config from '../../config';

const config = Config();
const { endpoints } = config;

const OperationDetail = () => {
  const { operationId } = useParams<{ operationId: string }>();
  const [data, setData] = useState<Operation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deconflictionData, setDeconflictionData] = useState<DeconflictionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        // Fetch operation data
        const operationResponse = await fetch(endpoints.operations);
        const operationData = await operationResponse.json();
        const jsonData = operationData.find((v: Operation) => v.id === operationId);

        if (jsonData?.submission_id) {
          // Fetch deconfliction data
          const conflictResponse = await fetch(endpoints['operations-conflicts']);
          const conflictData = await conflictResponse.json();
          const jsonConflictData = conflictData.find((v: DeconflictionData) => v.submission_id === jsonData.submission_id);

          setData(jsonData);
          setDeconflictionData(jsonConflictData);
        } else {
          setData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [operationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No operation data found.</div>;
  }

  const topLevel = (
    <>
      <div className={`top-level-container vendor-details ${deconflictionData && deconflictionData.active ? "confliction" : ""}`}>
        <div className="vendor-name">
          <div className="top-level-label">Operation Details</div>
          <h1>{data.operation_name}</h1>
        </div>
        <Grid col row className="vendor-information">
          <Grid col={3} className="">
            <div className="top-level-label">SUBMISSION ID</div>
            <div className="info">{data.submission_id}</div>
          </Grid>
          <Grid col={3} className="">
            <div className="top-level-label">SUBMISSION DATE</div>
            <div className="info">{data.submission_date}</div>
          </Grid>
        </Grid>
      </div>
      {deconflictionData && deconflictionData.active ? (
        <Deconfliction
          deconflictionData={deconflictionData}
          operationData={data as OperationData} // Cast to OperationData
        />
      ) : (
        ""
      )}
    </>
  );

  return (
    <PageTemplate
      topLevelContent={topLevel}
      leftSideContent={<OperationDetailSideInfo operation={data} />}
      leftSideContentSize={3}
      mainContent={<OperationDetailMain operationData={data} />}
      data={{
        operation: data
      }}
    />
  );
};

export default OperationDetail;
