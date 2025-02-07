import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./VendorDetail.scss";
import POC from '../../../components/POC/POC';
import VendorDetailSideInfo from './VendorDetailSideInfo';
import VendorOverview from './VendorOverview';
import PageTemplate from "../../../layouts/PageTemplate";

import Config from '../../config';

const config = Config();
const { endpoints } = config;


const VendorDetail = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const [vendor, setVendor] = useState<any>(null);
  //const [overviewData, setOverviewData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true); // Start loading

    // Fetch vendor data
    fetch(`${endpoints.vendors}?id=${vendorId}`)
      .then(response => response.json())
      .then(data => {
        setVendor(data[0]);
        setLoading(false); // finish loading
      })
      .catch(error => {
        console.error('Error fetching vendor data:', error);
      });

  }, [vendorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vendor) {
    return <div>Vendor not found or overview data not available.</div>;
  }

  const topLevel = (
    <div className="top-level-container vendor-details">
      <div className="vendor-name">
        <div className="top-level-label">VENDOR NAME</div>
        <h1>{vendor.Name}</h1>
      </div>
      <div className="vendor-information flex space-between">
        <div className="top-level-UEI">
          <div className="top-level-label">UNIQUE ENTITY ID</div>
          <div className="info">{vendor.UEI}</div>
        </div>
        <div className="top-level-UEI">
          <div className="top-level-label">CAGE/NCAGE</div>
          <div className="info">{vendor.Cage}</div>
        </div>
        <div className="top-level-UEI">
          <div className="top-level-label">REGISTRATION STATUS</div>
          <div className="info">{/* Add registration status */}</div>
        </div>
        <div className="top-level-UEI">
          <div className="top-level-label">EXPIRATION DATE</div>
          <div className="info">{/* Add expiration date */}</div>
        </div>
      </div>
    </div>
  );

  const leftContent = (
    <>
      <POC vendor={vendor}></POC>
      <VendorDetailSideInfo vendor={vendor}></VendorDetailSideInfo>
    </>
  );
  
  return (
    <PageTemplate 
      topLevelContent={topLevel} 
      leftSideContentSize={3} 
      leftSideContent={leftContent} 
      mainContent={<VendorOverview vendor={vendor} />} // Pass overviewData to VendorOverview
      data={{
        vendor
      }}
    />
  );
};

export default VendorDetail;
