import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTemplate from "../../../layouts/PageTemplate";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import FieldWithLabel from "src/Components/FieldWithLabel/FieldWithLabel";
import Config from '../../config';
import maleSoldier from './img/male.png';
import femaleSoldier from './img/female.jpg';
import ByCategoryLineChart from "./components/LineChart";
import WellnessChart from "./components/DonutChart";
import SurveyResponse from "./components/SurveyResponse";

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

  const sum = Object.values(recruitData.overall_wellness).reduce((acc, curr) => acc + curr, 0);

  // Calculate the average
  const avg = Math.round(sum / Object.keys(recruitData.overall_wellness).length);
  
  console.log(avg); // Output the average
  const outerData = [
    { label: 'You', value: avg, color: '#25AA61' }
  ];

  const innerData = [
    { label: 'USMC', value: 81, color: '#B9E1CD' }
  ];

  
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
          <Grid col={6}><ByCategoryLineChart recruit={recruitData}/></Grid>
            <Grid col={2}>
            <WellnessChart 
              outerData={outerData} 
              innerData={innerData}
              size={300}
              outerThickness={35}
              innerThickness={60}
              gap={-20}
              title={"Overall Wellness"}
            />
            </Grid>
      </Grid>
    </div>
  );
  
  return (
    <PageTemplate 
      topLevelContent={topLevel} 
      mainContent={<SurveyResponse recruit={recruitData}/>} // Pass overviewData to VendorOverview      
    />
  );
};

export default RecruitDetail;
