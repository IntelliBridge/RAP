import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import './linechart.scss';

// Register necessary components for Chart.js


const ByCategoryLineChart = ({ recruit }: { recruit: any }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 12, // Adjust font size for ticks
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)", // Grid lines color
          },
        },
        grid: {
          borderColor: 'rgba(0, 0, 0, 0.1)', // Specific border for y grid
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Grid lines color
        },
        ticks: {
          font: {
            size: 12, // Adjust font size for x-axis ticks
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxHeight: 2,
          boxWidth: 10,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "By Category",
        font: {
          size: 20,
        },
        color: "rgb(0, 0, 0)",
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "top",
        offset: -5,
        borderRadius: 10,
        padding: 4,
        color: "#000",
        font: {
          size: 16,
        },
        formatter: (value: number) => value,
      },
    },
    elements: {
      line: {
        borderWidth: 6, // Line border width
      },
      point: {
        radius: 7, // Point size on line
        hoverRadius: 8, // Hover point size
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
  };

  let data = recruit;
  console.log(data);
  
  const chartData = {
    labels: [
      "Military",
      "Family",
      "Physical",
      "Medical",
      "Mental",
      "Experience",
      "Tobacco",
      "Alcohol",
      "Work Exp",
    ],
    datasets: [
      {
        label: "You",
        data: [
          data['overall_wellness']['military'],
          data.overall_wellness.family,
          data.overall_wellness.physical,
          data.overall_wellness.medical,
          data.overall_wellness.mental,
          data.overall_wellness.experience,
          data.overall_wellness.tobacco,
          data.overall_wellness.alcohol,
          data.overall_wellness.work_experience,
        ],
        borderColor: "#1F78B4",
        backgroundColor: "#1F78B4",
        fill: false,
        tension: 0.4,
      },
      {
        label: "USMC",
        data: [81, 70, 69, 42, 81, 72, 86, 42, 48],
        borderColor: "#A6CEE3",
        backgroundColor: "#A6CEE3",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Company",
        data: [91, 76, 89, 92, 91, 72, 36, 82, 78],
        borderColor: "#B2DF8A",
        backgroundColor: "#B2DF8A",
        fill: false,
        tension: 0.4,
      },
      {
        label: "All Recruits",
        data: [91, 76, 89, 92, 91, 72, 36, 82, 78],
        borderColor: "#33A02C",
        backgroundColor: "#33A02C",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="by-category-line-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ByCategoryLineChart;
