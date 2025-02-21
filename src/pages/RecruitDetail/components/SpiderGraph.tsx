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
import './spidergraph.scss';

function SpiderGraph(recruits: JSON, graphWidth: string, graphHeight: string) {
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
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // Background fill, can be kept or removed
        borderColor: 'rgba(99, 102, 241, 1)', // Line color, will be removed
        borderWidth: 2, // Remove or reduce line width
        pointBackgroundColor: 'rgba(99, 102, 241, 1)', // Point color
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
        fill: true, // Disable background fill
        lineTension: 0, // Disable line smoothing
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
    elements: {
      line: {
        borderWidth: 0, // Remove line visibility
      },
      point: {
        radius: 5, // Adjust point size
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      datalabels: {
        display: false,
        font: {
          size: 16,
        },
      }
    },
  };

  return (
    <div className="radar-graph">
      <Radar data={data} options={options1} width={graphWidth} height={graphHeight} />
    </div>
  );
}

export default SpiderGraph;
