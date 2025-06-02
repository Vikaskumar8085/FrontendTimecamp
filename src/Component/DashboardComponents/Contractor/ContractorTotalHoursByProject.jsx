import React, {useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import {Card, CardContent, Typography, Paper, Box} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";
const ContractorTotalHoursByProject = () => {
  const [chartData, setChartData] = useState({labels: [], series: []});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(
          "/v2/contractor/fetch-contractor-dash-total-hours-by-project"
        );
        console.log(response, "response");
        if (response.data.success) {
          const projects = response.data.result;
          const labels = projects.map((project) => project.ProjectName);
          const series = projects.map((project) => project.totalBilledHours);

          setChartData({labels, series});
        }
      } catch (err) {
        console.log(err?.message);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      id: "project-chart",
      type: "bar",
    },
    xaxis: {
      categories: chartData.labels,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    title: {
      text: "Project Billed Hours",
      align: "center",
    },
    colors: ["#FF5733"],
    dataLabels: {
      enabled: true,
    },
  };
  return (
    <div>
      <Box sx={{width: "100%", my: 4, p: 4}} component={Paper}>
        <Typography variant="h6" gutterBottom>
          Projects Billed Hours
        </Typography>
        <ApexCharts
          options={chartOptions}
          series={[{name: "Billed Hours", data: chartData.series}]}
          type="bar"
          height={350}
        />
      </Box>
    </div>
  );
};

export default ContractorTotalHoursByProject;
