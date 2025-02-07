import React, { useState } from 'react';
import "./styles.scss"
import { Chart } from 'react-google-charts';
import { Table, Button, Icon } from "@trussworks/react-uswds";

interface MixedChartProps {
  graphData: any[][];
  title?: string;
  vAxisLeft?: string;
  vAxisRight?: string;
  hAxis?: string;
  width?: string;
  height?: string;
}

const MixedChart: React.FC<MixedChartProps> = ({
  graphData,
  title = "",
  vAxisLeft = "",
  vAxisRight = "",
  hAxis = "",
  width = "100%",
  height = "600px"
}) => {

  const [showTable, setShowTable] = useState<boolean>(false);

  // Calculate the maximum value from the data for dynamic ticks
  // const maxDataValue = Math.max(...graphData.slice(1).map(row => Math.max(...row.slice(1))));

  // Determine a suitable step size
  // const stepSize = Math.pow(10, Math.floor(Math.log10(maxDataValue)) - 1);

  // Generate ticks from 0 to maxDataValue with the determined stepSize
  const ticks = [0, 30e6, 60e6, 90e6, 120e6]
  const options = {
    title,
    vAxes: {
      0: {
        title: vAxisLeft,
        viewWindow: { min: 0 },
        format: 'short',
        ticks: ticks,
      },
      1: {
        title: vAxisRight,
        viewWindow: { min: 0 },
        ticks: [0, 8, 16, 24, 32],  // Assuming these are suitable for your secondary axis
      }
    },
    hAxis: { title: hAxis },
    seriesType: 'bars',
    series: {
      0: { targetAxisIndex: 0 },
      1: {
        type: 'line',
        targetAxisIndex: 1,
        pointSize: 16,
        color: '#F69F02',
        lineWidth: 2,
        pointsVisible: true,
      }
    },
    bar: { groupWidth: '75%' },
    legend: { position: 'bottom' },
    colors: ['#162E51', '#F69F02'],
    chartArea: {width: '90%'}
  };

  const toggleTableVisibility = () => {
    setShowTable(!showTable);
  };
  
  return (
    <>
      
      <Chart
        chartType="ComboChart"
        data={graphData}
        options={options}
        width={width}
        height={height}
        legendToggle
      />
    <Button className="toggle-btn" type="button" unstyled onClick={toggleTableVisibility}>
        <strong>{showTable ? 'Data Source ' : 'Data Source '}</strong>
        {showTable ? <Icon.ArrowDropDown size={4} /> : <Icon.ArrowDropUp size={4} />}
    </Button>
      {showTable && (
        <Table bordered fullWidth>
        <thead>
          <tr>
            {graphData[0].map((row, index) => (
              <td key={index}><strong>{row}</strong></td>
          ))}
          </tr>
        </thead>
        <tbody>
        {graphData.slice(1).map((row, index) => ( // Use slice(1) to skip the first array
          <tr key={index}>
            {row.map((cell, cellIndex) => ( // Use a different variable name for cell index to avoid conflict
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </Table>
      )}
    </>
  );
};

export default MixedChart;
