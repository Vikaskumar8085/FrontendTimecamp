import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {Paper, Typography, CircularProgress, Grid} from "@mui/material";

const EmployeeTotalHoursByCompany = () => {
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "Hours by Company",
      type: "bar", // Use 'bar' chart for visualizing different total hours
    },
    xaxis: {
      categories: [
        "Total Hours",
        "Total Ok Hours",
        "Total Billed Hours",
        "Total Blank Hours",
      ], // Categories of metrics
    },
    yaxis: {
      title: {
        text: "Hours",
      },
    },
    title: {
      text: "Total Hours By Company",
      align: "center",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Hours",
      data: [], // To store the total hours for each metric
    },
  ]);

  const fetchContractorTotalHoursByCompany = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-total-hour-by-company"
      );
      const metrics = response.data;
      const metricData = [
        metrics.totalhours,
        metrics.totalOkHours,
        metrics.totalBilledHours,
        metrics.totalBlankHours,
      ];
      setChartSeries([{name: "Total Hours", data: metricData}]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching metrics data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractorTotalHoursByCompany(); // Only run once on mount
  }, []);

  return (
    <Paper sx={{padding: 4, marginTop: 3}}>
      <Typography variant="h5" gutterBottom>
        Hours By Company
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
  );
};

export default EmployeeTotalHoursByCompany;
