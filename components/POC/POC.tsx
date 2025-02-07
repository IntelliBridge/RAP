import React from 'react';
import { Vendor } from './types';

const POC: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
    const { primary, secondary } = vendor.POC;
    return (
        <div className="points-of-contact-content">
            <div className="title">Points of Contact</div>
            <div className="poc-name">{primary.first_name} {primary.middle_initial} {primary.last_name}</div>
            {primary.title && (
                <div className="title">{primary.title}</div>
            )}
            <div className="address">
                {primary.address.line_1}<br />
                {primary.address.line_2 && <>{primary.address.line_2}<br /></>}
                {primary.address.city},&nbsp;
                {primary.address.state}&nbsp;
                {primary.address.zip_code}<br />
                {primary.address.country}
            </div>
            {secondary && (
                <div>
                    <div className="poc-name"><strong>{secondary.first_name} {secondary.middle_initial} {secondary.last_name}</strong></div>
                    {secondary.title && (
                        <div className="title"><strong>{secondary.title}</strong></div>
                    )}
                    {secondary.address.line_1 && (<div className="address">
                        {secondary.address.line_1}<br />
                        {secondary.address.line_2 && <>{secondary.address.line_2}<br /></>}
                        {secondary.address.city},&nbsp;
                        {secondary.address.state}&nbsp;
                        {secondary.address.zip_code}<br />
                        {secondary.address.country}
                    </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default POC;
