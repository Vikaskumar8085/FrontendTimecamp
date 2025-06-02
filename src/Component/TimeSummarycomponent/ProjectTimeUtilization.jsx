import apiInstance from "../../ApiInstance/apiInstance";
import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const ProjectTimeUtilization = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "project-time-utilization-chart",
        toolbar: {show: false},
      },
      xaxis: {
        categories: [], // Project names
        title: {text: "Projects"},
      },
      yaxis: {
        title: {text: "Hours"},
      },
      plotOptions: {
        bar: {horizontal: false, columnWidth: "50%"},
      },
      stroke: {
        show: true,
        width: [2, 2, 2],
        colors: ["#FF5733", "#33FF57", "#3357FF"],
      },
      dataLabels: {enabled: true},
      colors: ["#FF5733", "#33FF57", "#3357FF"], // Colors for bars and lines
      legend: {position: "top"},
    },
    series: [
      {name: "Billed Hours", type: "column", data: []},
      {name: "OK Hours", type: "line", data: []},
      {name: "Blank Hours", type: "line", data: []},
    ],
  });

  const projecttimeutilizationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-project-time-utilization"
      );

      const projects = response.data.Projects;

      const projectNames = projects.map((proj) => proj.ProjectName);
      const billedHours = projects.map((proj) => proj.totalBilledHours);
      const okHours = projects.map((proj) => proj.totalOkhours);
      const blankHours = projects.map((proj) => proj.totalblankhours);

      // Update chart data
      setChartData({
        options: {
          ...chartData.options,
          xaxis: {categories: projectNames},
        },
        series: [
          {name: "Billed Hours", type: "column", data: billedHours},
          {name: "OK Hours", type: "line", data: okHours},
          {name: "Blank Hours", type: "line", data: blankHours},
        ],
      });
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    projecttimeutilizationfunc();
  }, [0]);
  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ProjectTimeUtilization;
