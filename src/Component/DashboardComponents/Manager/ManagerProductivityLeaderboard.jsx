import apiInstance from "../../../ApiInstance/apiInstance";
import React, {useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import {
  Container,
  Card,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import {Link} from "react-router-dom";
const ManagerProductivityLeaderboard = () => {
  const [data, setData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar", // This ensures the chart type is 'bar'
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // By default, bars are vertical, you can set this to `true` to make them horizontal
      },
    },
    xaxis: {
      categories: [], // These are the labels (staff names)
    },
    series: [], // This holds the data (percentages for each staff member)
    colors: ["#FF4560", "#00E398"], // Set the color of bars
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  const fetchmanagerproductivityleaderboardfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/manager-productivity-leaderboard"
      );
      if (response.data.success) {
        const leaderboardData = response.data.result;

        const labels = leaderboardData.map((item) => item.Name); // Staff member names
        const seriesData = leaderboardData.map((item) => item.percentage); // Productivity percentages

        setData(leaderboardData); // Set the complete leaderboard data

        // Update chart options with the fetched data
        setChartOptions((prevState) => ({
          ...prevState,
          xaxis: {categories: labels}, // Set the X-axis categories (staff names)
          series: [
            {
              name: "Productivity Percentage", // Label for the series
              data: seriesData, // Set the series data (percentages)
            },
          ],
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide the loading spinner once data is fetched
    }
  };

  useEffect(() => {
    fetchmanagerproductivityleaderboardfunc();
  }, [0]);

  return (
    <div>
      {" "}
      <Typography variant="h5" gutterBottom align="center">
        Productivity Leaderboard
      </Typography>
      {/* Show a loading spinner while the data is being fetched */}
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default ManagerProductivityLeaderboard;
