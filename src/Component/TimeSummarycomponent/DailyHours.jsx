import React, {useEffect, useState} from "react";
import apiInstance from "../../ApiInstance/apiInstance";
import Chart from "react-apexcharts";
const DailyHours = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "day-wise-hours-chart",
      },
      xaxis: {
        categories: [],
        title: {text: "Days"},
      },
      yaxis: {
        title: {text: "Total Hours"},
      },
    },
    series: [
      {
        name: "Total Hours",
        data: [],
      },
    ],
  });
  const fetchdailyhoursfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-daily-hours"
      );
      const {days, totalhours} = response.data;

      setChartData({
        options: {
          chart: {id: "day-wise-hours-chart"},
          xaxis: {categories: days, title: {text: "Days"}},
          yaxis: {title: {text: "Total Hours"}},
        },
        series: [{name: "Total Hours", data: totalhours}],
      });
    } catch (error) {
      console.error("Error fetching day-wise hours:", error);
    }
    console.log(response, "???????????????");
  };

  useEffect(() => {
    fetchdailyhoursfunc();
  }, [0]);
  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="linebar"
        height={350}
      />
    </div>
  );
};

export default DailyHours;
