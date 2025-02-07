import React from 'react';
import { Chart } from 'react-google-charts';

interface DoughnutChartProps {
  percent: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ percent }) => {
  // Calculate the remaining percentage for the empty part of the doughnut
  const remainingPercent = 100 - percent;

  // Define the data for the chart
  const data = [
    ['Task', 'Hours per Day'],
    ['Completed', percent],
    ['Remaining', remainingPercent],
  ];

  // Options for the chart, including the title and inner text
  const options = {
    title: '',
    pieHole: 0.6, // The size of the inner circle (0 to 1)
    pieSliceText: 'none', // 'label', 'value', or 'percentage'
    pieSliceTextStyle: {
      color: 'black',
      fontSize: 18,
    },
    legend: 'none',
    slices: {
      0: { color: '#7291C7' }, // Completed part color
      1: { color: '#E1E7F1' }, // Remaining part color
    },
    chartArea: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
  };

  // Style for the center value
  const centerTextStyle: React.CSSProperties = {
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute' as 'absolute', // Ensuring correct type for 'position'
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '9rem' }}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="PieChart"
        data={data}
        options={options}
        loader={<div>Loading Chart</div>}
      />
      <div style={centerTextStyle}>{`${percent}%`}</div>
    </div>
  );
};

export default DoughnutChart;
