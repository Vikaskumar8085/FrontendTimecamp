import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import apiInstance from "../../ApiInstance/apiInstance";

const Hourbycompany = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "company-hours-chart",
        toolbar: {show: false},
      },
      xaxis: {
        categories: ["Hours"], // Static category for a single data point
        title: {text: "Hours Type"},
      },
      yaxis: {
        title: {text: "Total Hours"},
      },
      plotOptions: {
        bar: {horizontal: false, columnWidth: "50%"},
      },
      stroke: {
        show: true,
        width: [2, 2, 2, 2], // Line stroke width
        colors: ["#FF5733", "#33FF57", "#3357FF", "#F4C724"],
      },
      dataLabels: {enabled: true},
      colors: ["#FF5733", "#33FF57", "#3357FF", "#F4C724"], // Colors for bars and lines
      legend: {position: "top"},
    },
    series: [
      {name: "OK Hours", type: "column", data: [0]},
      {name: "Billed Hours", type: "line", data: [0]},
      {name: "Blank Hours", type: "line", data: [0]},
      {name: "Total Hours", type: "line", data: [0]},
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(
          "/v2/admin-dash/fetch-dash-hours-by-company"
        ); // API Call
        const {totalOkHours, totalBilledHours, totalBlankHours, totalhours} =
          response.data;

        // Update chart data
        setChartData({
          options: {
            ...chartData.options,
          },
          series: [
            {name: "OK Hours", type: "column", data: [totalOkHours]},
            {name: "Billed Hours", type: "line", data: [totalBilledHours]},
            {name: "Blank Hours", type: "line", data: [totalBlankHours]},
            {name: "Total Hours", type: "line", data: [totalhours]},
          ],
        });
      } catch (error) {
        console.error("Error fetching company hours:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {" "}
      <div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default Hourbycompany;
