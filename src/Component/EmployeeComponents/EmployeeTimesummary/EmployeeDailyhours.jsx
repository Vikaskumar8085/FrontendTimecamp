import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import moment from "moment"; // Import moment.js
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const EmployeeDailyhours = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    totalhours: [],
    days: [],
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "range-bar-chart",
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true, // Display bars horizontally
        rangeBarGroupRows: true, // Group range bars into rows
      },
    },
    xaxis: {
      categories: [], // Days will go here
    },
    yaxis: {
      title: {
        text: "Days",
      },
    },
    title: {
      text: "Total Hours Worked Per Day",
      align: "center",
    },
    legend: {
      position: "top",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Hours",
      data: [], // Total hours data will go here
    },
  ]);

  const fetchmanagerdailyhoursfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-daily-hours"
      );
      const {totalhours, days} = response.data;

      const formattedDays = days.map((day) => moment(day).format("YYYY/MM/DD")); // Format dates as 'YYYY-MM-DD'

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: formattedDays, // Set the formatted days on x-axis
        },
      }));

      // Prepare the data for the range bar chart
      const seriesData = formattedDays.map((day, index) => ({
        y: [0, totalhours[index]],
      }));

      setChartSeries([{name: "Total Hours", data: seriesData.map((d) => d.y)}]);

      setChartData({totalhours, days: formattedDays});
      setLoading(false);
    } catch (error) {
      console.error("Error fetching daily hours data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmanagerdailyhoursfunc();
  }, [0]);
  return (
    <div>
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Daily hours
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="rangeBar"
                height={350}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default EmployeeDailyhours;
