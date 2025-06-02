import React from "react";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ReactApexChart from "react-apexcharts";
import "./dashboardcounter.scss";
const DashboardCounter = () => {
  const title = "Total Billed Hours";
  const data = [
    {date: "2025-05-20", hours: 5},
    {date: "2025-05-21", hours: -3},
    {date: "2025-05-22", hours: 4},
    {date: "2025-05-23", hours: -2},
    {date: "2025-05-24", hours: 4},
  ];

  const categories = data.map((d) => d.date);
  const seriesData = data.map((d) => d.hours);

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {show: false},
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 6,
      custom: function ({dataPointIndex}) {
        const point = data[dataPointIndex];
        return {
          size: 8,
          shape: point.hours >= 0 ? "triangle" : "invertedTriangle",
          fillColor: point.hours >= 0 ? "#00e396" : "#ff4560",
        };
      },
    },
    xaxis: {
      categories,
      labels: {show: false},
      axisTicks: {show: false},
      axisBorder: {show: false},
      title: {text: ""},
    },
    yaxis: {
      labels: {show: false},
      axisTicks: {show: false},
      axisBorder: {show: false},
      title: {text: ""},
    },
    tooltip: {
      enabled: false, // optional: disable tooltip too
    },
    grid: {
      show: false, // remove grid lines for a cleaner look
    },
    colors: ["#008FFB"],
  };

  const series = [
    {
      name: "Total Hours",
      data: seriesData,
    },
  ];

  return (
    <>
      <div className="dashbord-wrapper">
        <div className="dashboard-box">
          <div className="dashboard-box-header">
            <div className="dashboard-box-left">
              <span>{<WatchLaterOutlinedIcon />}</span>
            </div>
            <div className="dashboard-box-right">
              <h1>{title}</h1>
            </div>
          </div>

          <div className="dashboard-box-body">
            <div className="dashboard-box-body-content">
              <h2>0</h2>
              <p>hours</p>
              <div className="dahbord-box-linechart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCounter;
