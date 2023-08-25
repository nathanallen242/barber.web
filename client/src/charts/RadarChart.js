import React from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: ["Norte", "NE", "SE", "Sur", "SO", "NO"],
  datasets: [
    {
      label: "Distribución usuarios",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
};

const RadarChart = () => (
  <>
    <div className="header">
      <h3 className="title">Gráfico Radar</h3>
    </div>
    <Radar data={data} options={options} />
  </>
);

export default RadarChart;