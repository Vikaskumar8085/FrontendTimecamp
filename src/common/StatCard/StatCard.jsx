import React from "react";
import Chart from "react-apexcharts";
import {Clock} from "lucide-react";
import "./statcard.scss";

const StatCard = ({
  title = "Monthly Sales",
  value = "1200",
  unit = "USD",
  percentage = "5.4",
  trendDown = false,
  chartData = [10, 20, 15, 30, 25],
}) => {
  const chartOptions = {
    chart: {
      type: "area",
      sparkline: {enabled: true},
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: [trendDown ? "#FF5E5E" : "#00C49F"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {show: false},
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div className="stat-card">
      <div className="left">
        <div className="left_wrapper">
          <div className="icon-wrapper">
            <Clock size={20} color="#fff" />
          </div>
          <h4 className="title">{title}</h4>
        </div>
        <div className="value">
          {value} <span>{unit}</span>
        </div>
        <div className="change">
          <span className={trendDown ? "down" : "up"}>
            {trendDown ? "↓" : "↑"} {percentage}%
          </span>{" "}
          vs last month
        </div>
      </div>
      <div className="right">
        <Chart
          options={chartOptions}
          series={[{data: chartData}]}
          type="area"
          height={70}
          width={250}
        />
      </div>
    </div>
  );
};

export default StatCard;
