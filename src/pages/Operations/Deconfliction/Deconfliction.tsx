import { useState, useEffect } from "react";
import { Grid } from "@trussworks/react-uswds";
import "./styles.scss";
import OrganizationCards from "../../../../components/OrganizationCards/OrganizationCards";
import {DeconflictionData, OperationData} from "../types";

interface DeconflictionProps {
  deconflictionData: DeconflictionData;
  operationData: OperationData;
}
const Deconfliction = ({ deconflictionData, operationData }: DeconflictionProps) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        // Fetch Organizations
        const operationResponse = await fetch(`${import.meta.env.VITE_JSON_SERVER}/organization`);
        const organizationData = await operationResponse.json();

        setData(organizationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);


  return (
    <div className="deconfliction-container">
      <Grid row>
        <Grid row gap col={7}>
          <Grid row>
            <Grid col={12}>
              <div className="title">Potential Conflict Summary</div>
              <div className="conflicts-list">
                {deconflictionData.conflict_info.map((v, index) => {
                  return (
                    <div key={index} className="conflict-bubble">
                      {v.type}
                    </div>
                  );
                })}
              </div>
              <div className="subtitle title">Concerns</div>
              <div className="concerns-list">
                {deconflictionData.concerns.map((v, index) => {
                  return (
                    <div key={index} className="conflict-bubble">
                      {v.type}
                    </div>
                  );
                })}
              </div>
              <Grid row gap>
                <Grid row gap col={6}>
                  <Grid col={12} className="subtitle title">Period of Performance (POP)</Grid>
                  <Grid col={6}>
                    <div className="label">Start Date</div>
                    <div className="value">{operationData.pop.start}</div>
                  </Grid>
                  <Grid col={6}>
                    <div className="label">End Date</div>
                    <div className="value">{operationData.pop.end}</div>
                  </Grid>
                </Grid>
                <Grid col={6}>
                  <Grid col={12} className="subtitle title">Location</Grid>
                  <Grid>
                    <div className="label">City/State/Country</div>
                    <div className="value">{operationData.operation_location.city}, {operationData.operation_location.state} {operationData.operation_location.zip} {operationData.operation_location.country}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <div className="subtitle title">
                  Submission Information
                </div>
                <Grid row>
                  <Grid col={3}>
                    <div className="label">Agency</div>
                    <div className="value">
                      Organization Name
                    </div>
                  </Grid>
                  <Grid col={3}>
                    <div className="label">Name</div>
                    <div className="value">
                      {operationData.POC.primary.first_name} {operationData.POC.primary.last_name} 
                    </div>
                  </Grid>
                  <Grid col={3}>
                    <div className="label">Phone</div>
                    <div className="value">
                      {operationData.phone} 
                    </div>
                  </Grid>
                  <Grid col={3}>
                    <div className="label">Email</div>
                    <div className="value">
                      {operationData.email} 
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid row gap col={5}>
          <div className="subtitle title">Organization connected with proposed vendors</div>
          <div className="organization-card-container">
            {loading ? (
              <div>Loading...</div>
            ) : (
              data && deconflictionData.connected_organization.map((orgName, index) => {
               
                return (
                  <OrganizationCards key={index} data={data[orgName]} label={orgName} />
                );
              })
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Deconfliction;
