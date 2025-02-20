import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

function SpiderGraph(recruits:JSON) {
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
      );
  const data = {
    labels: Object.keys(recruits.recruits.overall_wellness).map(
      (label) => label.charAt(0).toUpperCase() + label.slice(1).replace('_', ' ').toUpperCase()
    ),
    datasets: [
      {
        label: 'Wellness Score',
        data: Object.values(recruits.recruits.overall_wellness),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options1 = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)', // Custom color for angle lines
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'rgba(255, 255, 255, 0.5)', // Add backdrop to ticks
          font: {
            size: 12, // Adjust font size for tick labels
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="radar-graph">
        <Radar data={data} options={options1} />
    </div>
  );
}

export default SpiderGraph;
