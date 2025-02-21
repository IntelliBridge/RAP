import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PageTemplate from "../../../layouts/PageTemplate";
import { Grid, Button, Modal, ModalToggleButton, ModalRef } from "@trussworks/react-uswds";
import FieldWithLabel from "src/Components/FieldWithLabel/FieldWithLabel";
import Config from "../../config";
import maleSoldier from "./img/male.png";
import femaleSoldier from "./img/female.jpg";
import ByCategoryLineChart from "./components/LineChart";
import WellnessChart from "./components/DonutChart";
import SurveyResponse from "./components/SurveyResponse";
import ProfileMiniKnowledgeGraph from "./components/ProfileMiniKnowledgeGraph";
import { KGProgress } from "./components/KGProgress";
import SelfKnowledgeGraph from "./components/SelfKnowledgeGraph";
import PlatoonKnowledgeGraph from "./components/PlatoonKnowledge";
import SpiderGraph from "./components/SpiderGraph";
import "./recruitdetail.scss";

const config = Config();
const { endpoints } = config;

const RecruitDetail = () => {
  const { recruitId } = useParams<{ recruitId: string }>();
  const [recruitData, setRecruitData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recruits, setRecruits] = useState<any>(null); // Renamed recruitsResponse to recruits
  const modalKnowledgeRef = useRef<ModalRef>(null);
  const [selectedTab, setSelectedTab] = useState("self");

  useEffect(() => {
    const fetchRecruitData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${endpoints.recruits}?id=${recruitId}`);
        const data = await response.json();
        setRecruitData(data[0] || null);
      } catch (error) {
        console.error("Error fetching recruit data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecruits = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_JSON_SERVER}/recruits`);
        const data = await response.json();
        setRecruits(data); // Store data in recruits
      } catch (error) {
        console.error("Error fetching recruits data:", error);
      }
    };

    fetchRecruitData();
    fetchRecruits();
  }, [recruitId]);

  const formatPhoneNumber = (number: string) => {
    const str = number.toString();
    const match = str.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    return match ? `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}` : number;
  };

  if (loading) return <div>Loading...</div>;
  if (!recruitData) return <div>Recruit not found or overview data not available.</div>;

  const profileImg = recruitData.gender === "male" ? maleSoldier : femaleSoldier;

  const sum = Object.values(recruitData.overall_wellness).reduce((acc, curr) => acc + curr, 0);
  const avg = Math.round(sum / Object.keys(recruitData.overall_wellness).length);

  const outerData = [{ label: "You", value: avg, color: "#25AA61" }];
  const innerData = [{ label: "USMC", value: 81, color: "#B9E1CD" }];

  const handleTabChange = (tab: string) => setSelectedTab(tab);

  const topLevel = (
    <>
      <Modal ref={modalKnowledgeRef} id="knowledge-modal" role="dialog" isInitiallyOpen={false}>
        <div className="flex kgp-container">
          <div className="kgp-title">Me:</div>
          {Object.entries(recruitData.overall_wellness).map(([key, value]) => (
            <KGProgress key={key} label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} value={value} />
          ))}
        </div>

        {selectedTab === "platoon" && (
          <div className="flex kgp-container">
            <div className="kgp-title">Platoon:</div>
            {Object.entries(recruitData.overall_wellness).map(([key, value]) => (
              <KGProgress key={key} label={''} value={value} />
            ))}
          </div>
        )}

        <div className="kg-tab-navigation">
          {["self", "platoon", "company", "base"].map((tab) => (
            <button key={tab} onClick={() => handleTabChange(tab)} className={selectedTab === tab ? "active" : ""}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {selectedTab === "self" && <SelfKnowledgeGraph recruit={recruitData} selfImg={profileImg} />}
        {selectedTab === "platoon" && recruits ? (
          <PlatoonKnowledgeGraph uic={recruitData.uic} data={recruits} recruitID={recruitId} profileImg={profileImg} />
        ) :""}
      </Modal>

      <div className="top-level-container">
        <h1>Hello, {recruitData.first_name}, this is your assessment overview.</h1>
        <Grid row gap>
            <Grid col={2}>
              <img src={profileImg} alt="Recruit" />
              <WellnessChart outerData={outerData} innerData={innerData} size={150} outerThickness={15} innerThickness={30} gap={-20} title="Overall Wellness" />
            </Grid>
            <Grid col={2}>
              <FieldWithLabel label="Name" value={`${recruitData.first_name} ${recruitData.middle_initial} ${recruitData.last_name}`} />
              <FieldWithLabel
                label="DOB"
                value={new Date(recruitData.dob).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              />
              <FieldWithLabel label="Rank" value={recruitData.rank} />
              <FieldWithLabel label="Contact Information" value={`${recruitData.address} ${recruitData.city}, ${recruitData.state} ${recruitData.zip}`} />
              <FieldWithLabel label="Email" value={recruitData.email} />
              <FieldWithLabel label="Phone" value={formatPhoneNumber(recruitData.phone)} />
            </Grid>
          <Grid col={5} className="bordered">
            <ByCategoryLineChart recruit={recruitData} />
          </Grid>
          <Grid col={3} className="bordered">
            <div className="wellness-graph-title">Wellness Overview</div>
            {/* <ProfileMiniKnowledgeGraph recruits={recruitData} profileImg={profileImg} /> */}
            <SpiderGraph recruits={recruitData} graphWidth={300} graphHeight={300}/>
            <div className="compare-button">
              <ModalToggleButton modalRef={modalKnowledgeRef} className="compare-button" opener type="button" unstyled>
                Compare with Peers
              </ModalToggleButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );

  return <PageTemplate topLevelContent={topLevel} mainContent={<SurveyResponse recruit={recruitData} />} />;
};

export default RecruitDetail;
