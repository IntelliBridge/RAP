import React from 'react';
import DOMPurify from 'dompurify';
import "./NumbersViz.scss";

// Define the type for the data
interface DataType {
  type: {
    color: string;
    value: number;
    reference: {
      name: string;
    };
  };
}

interface EqualSizeDataVizProps {
  data: DataType[];
  heading: string;
  label: string;
}

const EqualSizeDataViz: React.FC<EqualSizeDataVizProps> = ({ data, heading, label }) => {
  return (
    <>
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
            <div key={index} className={"number-viz "}>
              <div className={"number " + v.type.color}>
                {v.type.value}
              </div>
              <span className={"dot dot-" + v.type.color}><a href="#">{v.type.reference.name}</a></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EqualSizeDataViz;
