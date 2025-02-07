import React from 'react';
import DOMPurify from 'dompurify';
import "./NumbersViz.scss";

// Define the type for the data
interface DataType {
  type: {
    color: string;
    value: number;
    name: string;
  };
}

interface NumberVizProps {
  data: DataType[];
  heading: string;
  label: string;
}

const NumberViz: React.FC<NumberVizProps> = ({ data, heading, label }) => {
  return (
    <>
      <div className="number-viz-container">
        <div className="heading">
          {heading}
        </div>
        <div
          className="label"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }}
        />
        <div className="data-info">
          {data.map((v, index) => (
            <div key={index} className={"number-viz " + v.type.color}>
              <div className="number">
                {v.type.value}
              </div>
              <div className="type">
                {v.type.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NumberViz;
