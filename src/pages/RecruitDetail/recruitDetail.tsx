import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTemplate from "../../../layouts/PageTemplate";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import FieldWithLabel from "src/Components/FieldWithLabel/FieldWithLabel";
import Config from '../../config';
import maleSoldier from './img/male.png';
import femaleSoldier from './img/female.jpg';
import ByCategoryLineChart from "./components/LineChart";

const config = Config();
const { endpoints } = config;


const RecruitDetail = () => {
  const { recruitId } = useParams<{ RecruitId: string }>();
  const [recruitData, setRecruitData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true); // Start loading

    // Fetch vendor data
    fetch(`${endpoints.recruits}?id=${recruitId}`)
      .then(response => response.json())
      .then(data => {
        setRecruitData(data[0]);
        setLoading(false); // finish loading
        console.log(data[0])
      })
      .catch(error => {
        console.error('Error fetching vendor data:', error);
      });

  }, [recruitId]);

  const formatPhoneNumber = (number) => {
    const str = number.toString();
    const match = str.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return number; // Return the original number if it doesn't match the pattern
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recruitData) {
    return <div>Recruit not found or overview data not available.</div>;
  }

  let profileImg;
  if (recruitData.gender === "male") {
    profileImg = maleSoldier;
  } else {
    profileImg = femaleSoldier;
  }
  const topLevel = (
    <div className="top-level-container">
      <h1>Assessment Overview</h1>
        <Grid row>
          <Grid row gap col={4} tablet={{ col: true }}>
            <Grid col={6}>
              <img src={profileImg} alt="" />
            </Grid>
            <Grid col={6}>
              <FieldWithLabel 
                label="Name" 
                value={`${recruitData.first_name} ${recruitData.middle_initial} ${recruitData.last_name} `}
              />
              <FieldWithLabel 
                label="DOB" 
                value={new Date(recruitData.dob).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              />
               <FieldWithLabel 
                label="Rank" 
                value={recruitData.rank}
              />
              <FieldWithLabel 
                label="Contact Information" 
                value={`${recruitData.address}${recruitData.address_2}, ${recruitData.city}, ${recruitData.state} ${recruitData.zip}`}
              />
              <FieldWithLabel 
                label="Email" 
                value={`${recruitData.email}`}
              />
                            <FieldWithLabel 
                label="Phone" 
                value={`${formatPhoneNumber(recruitData.phone)}`}
              />
            </Grid>
          </Grid>
          <Grid col={6} tablet={{
            col: true
          }}><ByCategoryLineChart /></Grid>
            <Grid col={2} tablet={{
            col: true
          }}>testContent</Grid>
      </Grid>
    </div>
  );
  
  return (
    <PageTemplate 
      topLevelContent={topLevel} 
      mainContent={<div>main</div>} // Pass overviewData to VendorOverview      
    />
  );
};

export default RecruitDetail;
