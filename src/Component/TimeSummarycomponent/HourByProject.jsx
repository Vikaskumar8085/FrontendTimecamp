import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import apiInstance from "../../ApiInstance/apiInstance";

const HourByProject = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "project-hours-chart",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Total Billed Hours",
        data: [],
      },
    ],
  });

  const fetchhourbyprojectfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-hours-by-projects"
      );
      const projects = response.data.Projects;

      const projectNames = projects.map((proj) => proj.ProjectName);
      const totalHours = projects.map((proj) => proj.totalBilledHours);

      setChartData({
        options: {
          chart: {
            id: "project-hours-chart",
          },
          xaxis: {
            categories: projectNames,
          },
        },
        series: [
          {
            name: "Total Billed Hours",
            data: totalHours,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching project hours:", error);
    }
  };

  useEffect(() => {
    fetchhourbyprojectfunc();
  }, [0]);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default HourByProject;
