import React from 'react';
import DOMPurify from 'dompurify';
import "./NumbersViz.scss";

// Define the type for the data
interface DataType {
  type: {
    color: string;
    value: number; // Ensure value is a number
    reference: {
      name: string;
    };
  };
}

interface UnequalSizeDataVizProps {
  data: DataType[];
  heading: string;
  label: string;
}

const UnequalSizeDataViz: React.FC<UnequalSizeDataVizProps> = ({ data, heading, label }) => {
  // Calculate total value for determining width sizes
  const totalValue = data.reduce((acc, current) => {
    // Convert the 'value' from string to number and add to accumulator
    return acc + current.type.value;
  }, 0);
  
  return (
    <div className="number-singlebar-even-viz-container">
      <div className="heading">
        {heading}
      </div>
      <div
        className="label"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }}
      />
      <div className="data-info">
        {data.map((v, index) => (
          <div key={index} className={`number-viz unequal-size`} style={{ width: `${(v.type.value / totalValue) * 100}%` }}>
            <div className={"number " + v.type.color} >
              {v.type.value}
            </div>
            <span className={`dot dot-${v.type.color}`}>
              <a href="#">{v.type.reference.name}</a>
            </span>
            {/* Calculate width based on percentage of total */}
            <div className="bar" style={{ width: `${(v.type.value / totalValue) * 100}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnequalSizeDataViz;
