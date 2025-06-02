import React from "react";
import Chart from "react-apexcharts";

const BilledHoursByProject = () => {
  // Sample data
  const chartData = {
    series: [
      {
        name: "Billed Hours",
        data: [120, 200, 150, 180, 220], // Replace with actual billed hours
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: [
          "Project A",
          "Project B",
          "Project C",
          "Project D",
          "Project E",
        ], // Replace with project names
        title: {
          text: "Projects",
        },
      },
      yaxis: {
        title: {
          text: "Billed Hours",
        },
      },
      colors: ["#FF4560"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h3>Billed Hours by Project</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BilledHoursByProject;
