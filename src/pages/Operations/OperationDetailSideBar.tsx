import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../components/POC/POC.scss';
import { Operation, Vendor } from './types';
import SBGF from '../../../components/SidebarGeneralFormat/SideBarGeneralFormat';
import POC from "../../../components/POC/POC";
import "./OperationDetail.scss";
import {
  Button,
  Card, CardBody, CardFooter, CardHeader,
} from "@trussworks/react-uswds";
import FavoriteOutline from "../../assets/icons/favorite_outline.svg";


import Config from '../../config';

const config = Config();
const { endpoints } = config;

// Define the interface for props
interface OperationDetailSideInfoProps {
    operation: Operation;
}

// Define the component using the props interface
const OperationDetailSideInfo: React.FC<OperationDetailSideInfoProps> = ({ operation }) => {
    const [associatedVendorData, setAssociatedVendorData] = useState<Vendor[]>([]);
    const vendorsUEIs = operation.vendors.map(uei => uei.UEI);

    useEffect(() => {
        const findVendors = async () => {
            try {
                const response = await fetch(endpoints.vendors);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const allVendors = await response.json();
                const filteredVendors = allVendors.filter((vendor: Vendor) => vendorsUEIs.includes(vendor.UEI));
                setAssociatedVendorData(filteredVendors);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state if needed
            }
        };

        findVendors();
    }, [
        // vendorsUEIs
    ]);

    return (
        <>
            <div className="associated-vendors">
                <div className="title-gray">
                    Vendor(s) Associated
                </div>
                {associatedVendorData.map((item: Vendor, index: number) => (
                    <Card key={index} containerProps={{ className: "" }}>
                        <div className="usa-card-favorite"><img src={FavoriteOutline} alt="favorite button" /></div>
                        <CardHeader>
                            <h3 className="usa-card__heading">{item.Name}</h3>
                        </CardHeader>
                        <CardBody>
                            <p className="truncate">
                                {item.Description}
                            </p>
                        </CardBody>
                        <CardFooter>
                            <Link to={`/vendors/${item.UEI}`}>
                                <Button type="button" outline>
                                    View
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <POC vendor={operation} />
            <SBGF label="Phone">
                <div className="phone">
                    {operation.phone}
                </div>
            </SBGF>
            <SBGF label="Fax">
                <div className="phone">
                    {operation.fax_number}
                </div>
            </SBGF>
            <SBGF label="URL">
                <div className="url">
                    <a href={operation.url}>{operation.url}</a>
                </div>
            </SBGF>
            <SBGF label="Other Known Names">
                <ul className="list-of-names">
                    {operation.other_known_entity.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </SBGF>
            <SBGF label="Subcontractor(s)">
                <ul className="list-of-names">
                    {operation.subcontractors.map((data, index) => (
                        data.url ? (<li key={index}><a href={data.url}>{data.name}</a></li>) : (<li key={index}>{data.name}</li>)
                    ))}
                </ul>
            </SBGF>
        </>
    );
};

export default OperationDetailSideInfo;
