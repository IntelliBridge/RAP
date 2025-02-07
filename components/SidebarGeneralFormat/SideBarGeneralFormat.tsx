import React, { ReactNode } from 'react';
import './styles.scss';

interface SBGFProps {
    children: ReactNode;
    label: string | null;
}

const SBGF: React.FC<SBGFProps> = ({ children, label }) => {
    return (
        <div className="detail-side-content">
            <div className="label">{label}</div>
            {children}
        </div>
    );
};

export default SBGF;
