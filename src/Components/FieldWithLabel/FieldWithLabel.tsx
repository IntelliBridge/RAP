import React from 'react';
import "./FieldWithLabel.scss";
interface FieldWithLabelProps {
    label: string;
    value: string | React.ReactNode; // value can be a string or any renderable React node
}

const FieldWithLabel: React.FC<FieldWithLabelProps> = ({ label, value }) => {
  return (
    <div className='field-width-label'>
      <label>{label}</label>
      <div className='value'>
        {value}
      </div>
    </div>
  );
};

export default FieldWithLabel;
