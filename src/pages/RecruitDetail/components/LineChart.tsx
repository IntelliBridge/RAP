import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./linechart.scss";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const data = {
    labels: [
      "Military",
      "Family",
      "Physical",
      "Medical",
      "Mental",
      "Experience",
      "Tobacco",
      "Alcohol",
      "Work Experience",
    ],
    datasets: [
      {
        label: "You",
        data: [91, 76, 89, 92, 91, 72, 36, 82, 78],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        fill: true,
        tension: 0.4, // Adjust this value to make the line curvier (0 is straight, 1 is max curve)
      },
      {
        label: "USMC",
        data: [81, 70, 69, 42, 81, 72, 86, 42, 48],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Same here to apply curve
      },
      {
        label: "Company",
        data: [91, 76, 89, 92, 91, 72, 36, 82, 78],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4, // Curving the line for Company data
      },
      {
        label: "All Recruits",
        data: [91, 76, 89, 92, 91, 72, 36, 82, 78],
        borderColor: "rgb(0, 204, 0)",
        backgroundColor: "rgba(0, 204, 0, 0.2)",
        fill: true,
        tension: 0.4, // Apply curve here too
      },
    ],
  };

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "By Category",
    },
  },
  scales: {
    y: {
      min: 30,
      max: 100,
    },
  },
};

const ByCategoryLineChart = () => {
  return (
    <div className="by-catergory-line-chart">
        <Line data={data} options={options} />
    </div>
);
};

export default ByCategoryLineChart;
