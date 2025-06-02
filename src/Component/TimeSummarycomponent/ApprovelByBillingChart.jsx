import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import apiInstance from "../../ApiInstance/apiInstance";

const ApprovelByBillingChart = () => {
  const [chartData, setChartData] = useState({
    days: [],
    totalHours: [],
    billedHours: [],
  });

  const fetchapprovelbybillingchartfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-approvel-by-billed-and-total-hours"
      );

      const {total_hours, billed_hours, days} = response.data;

      setChartData({
        days,
        totalHours: total_hours,
        billedHours: billed_hours,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(response);
  };

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: chartData.days,
      title: {
        text: "Days",
      },
    },
    yaxis: {
      title: {
        text: "Hours",
      },
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#008FFB", "#FF4560"], // Blue for total hours, Red for billed hours
  };

  const series = [
    {
      name: "Total Hours",
      data: chartData.totalHours,
    },
    {
      name: "Billed Hours",
      data: chartData.billedHours,
    },
  ];

  useEffect(() => {
    fetchapprovelbybillingchartfunc();
  }, [0]);
  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApprovelByBillingChart;
