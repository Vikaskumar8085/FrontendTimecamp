import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import Chart from "react-apexcharts";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
const EmployeeTotalHoursByResources = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    totalHours: [],
    billedHours: [],
  });
  const fetchcontractortotalhoursbyresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-total-hours-by-resources"
      );
      if (response.data.success) {
        const {StaffName, totalHours, totalBilledHours} = response.data.result;

        setChartData({
          categories: [StaffName], // Single Staff Name
          totalHours: totalHours.map(Number), // Convert to numbers
          billedHours: totalBilledHours.map(Number),
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const options = {
    chart: {type: "bar"},
    xaxis: {categories: chartData.categories},
    colors: ["#008FFB", "#FF4560"],
    // title: {text: "Total & Billed Hours by Contractor"},
  };

  const series = [
    {name: "Total Hours", data: chartData.totalHours},
    {name: "Billed Hours", data: chartData.billedHours},
  ];

  useEffect(() => {
    fetchcontractortotalhoursbyresourcesfunc();
  }, [0]);
  return (
    <div>
      {" "}
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Total hours
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Chart options={options} series={series} type="bar" height={350} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EmployeeTotalHoursByResources;
