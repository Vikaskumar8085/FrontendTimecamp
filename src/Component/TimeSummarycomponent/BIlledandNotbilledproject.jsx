import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import apiInstance from "../../ApiInstance/apiInstance";

const BIlledandNotbilledproject = () => {
  const [chartData, setChartData] = useState({labels: [], series: []});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(
          "/v2/admin-dash/fetch-dash-billed-notbilled"
        );
        console.log(response, ">>>>>>>>");
        if (response.data.success) {
          const projects = response.data.data;
          console.log(projects, ".asdfsdfk");

          const labels = projects.map((project) => project.Project_Name);
          const billedSeries = projects.map((project) => project.BILLED);
          const notBilledSeries = projects.map((project) => project.NOT_BILLED);

          setChartData({
            labels,
            series: [
              {name: "BILLED", data: billedSeries},
              {name: "NOT BILLED", data: notBilledSeries},
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Chart
          options={{
            chart: {type: "pie"},
            labels: chartData.labels,
          }}
          series={chartData.series.map((s) =>
            s.data.reduce((a, b) => a + b, 0)
          )} // Summing values for pie chart
          type="pie"
          width="500"
        />
      </div>
    </>
  );
};

export default BIlledandNotbilledproject;
