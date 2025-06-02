import React, {useEffect, useState} from "react";
import apiInstance from "../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const ClientTotalHourByProject = () => {
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "project-billed-hour-chart",
      type: "bar", // Use 'bar' chart for better display of total billed hours per project
    },
    xaxis: {
      categories: [], // To store project names
    },
    yaxis: {
      title: {
        text: "Total Billed Hours",
      },
    },
    title: {
      text: "Total Billed Hours by Project",
      align: "center",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Billed Hours",
      data: [],
    },
  ]);
  const fetchclienttotalhourbyprojectfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-total-hour-by-project"
      );
      const projects = response.data.Projects || [];

      const projectNames = projects.map((project) => project.ProjectName);
      const billedHours = projects.map((project) => project.totalBilledHours);

      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories: projectNames,
        },
      });

      setChartSeries([{name: "Total Billed Hours", data: billedHours}]);
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchclienttotalhourbyprojectfunc();
  }, [0]);

  return (
    <>
      {" "}
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Hours By Project
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
    </>
  );
};

export default ClientTotalHourByProject;
