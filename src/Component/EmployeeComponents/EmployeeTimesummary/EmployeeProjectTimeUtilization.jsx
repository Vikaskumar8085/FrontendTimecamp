import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
const EmployeeProjectTimeUtilization = () => {
  const [loading, setLoading] = useState(true);
  const [checkprojects, setCheckprojects] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "project-chart",
      type: "bar",
    },
    xaxis: {
      categories: [], // Project names will go here
    },
    yaxis: {
      title: {
        text: "Hours",
      },
    },
    title: {
      text: "Project Time Utilization",
      align: "center",
    },
    legend: {
      position: "top",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Billed Hours",
      data: [], // Billed hours data will go here
    },
    {
      name: "Ok Hours",
      data: [], // Ok hours data will go here
    },
    {
      name: "Blank Hours",
      data: [], // Blank hours data will go here
    },
  ]);
  const fetchcontractorprojecttimeutilizationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-project-time-utilization"
      );
      const projectData = response.data.Projects; // Assuming your API returns a list of projects

      // Map the project data into categories (project names) and series (hours data)
      const projectNames = projectData.map((proj) => proj.ProjectName);
      const billedHours = projectData.map((proj) => proj.totalBilledHours);
      const okHours = projectData.map((proj) => proj.totalOkhours);
      const blankHours = projectData.map((proj) => proj.totalblankhours);

      // Update chart options and series with fetched data
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: projectNames,
        },
      }));

      setChartSeries([
        {name: "Billed Hours", data: billedHours},
        {name: "Ok Hours", data: okHours},
        {name: "Blank Hours", data: blankHours},
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching project data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcontractorprojecttimeutilizationfunc();
  }, [0]);
  return (
    <div>
      {" "}
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Project Time Utilization
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default EmployeeProjectTimeUtilization;
