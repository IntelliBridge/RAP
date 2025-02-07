import React from 'react';
import '../../../components/POC/POC.scss';
import { Vendor } from './types';
import SBGF from '../../../components/SidebarGeneralFormat/SideBarGeneralFormat';
// Define the interface for props
interface VendorDetailSideInfoProps {
    vendor: Vendor;
}

// Define the component using the props interface
const VendorDetailSideInfo: React.FC<VendorDetailSideInfoProps> = ({ vendor }) => {
    return (
        <>
        <SBGF label="Physical Address">
            <div className="address">
                {vendor.physical_address.line_1}<br />
                {vendor.physical_address.line_2 && <>{vendor.physical_address.line_2}<br /></>}
                {vendor.physical_address.city},&nbsp;
                {vendor.physical_address.state}&nbsp;
                {vendor.physical_address.zip_code}<br />
                {vendor.physical_address.country}
            </div>
        </ SBGF>
        <SBGF label="Maining Address">
            <div className="address">
                {vendor.mailing_address.line_1}<br />
                {vendor.mailing_address.line_2 && <>{vendor.mailing_address.line_2}<br /></>}
                {vendor.mailing_address.city},&nbsp;
                {vendor.mailing_address.state}&nbsp;
                {vendor.mailing_address.zip_code}<br />
                {vendor.mailing_address.country}
            </div>
        </ SBGF>
    </>
    );
};

export default VendorDetailSideInfo;
