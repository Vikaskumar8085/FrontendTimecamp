import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Chart from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";
import {CircularProgress, Alert, Box, Typography, Paper} from "@mui/material";

const ProductivityLeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-productivity-leadearboard"
      );
      if (response.data.success) {
        setLeaderboard(response.data.result);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: leaderboard.map((staff) => staff.Name),
    },
  };

  const chartSeries = [
    {
      name: "Productivity %",
      data: leaderboard.map((staff) => staff.percentage),
    },
  ];

  useEffect(() => {
    fetchLeaderboard();
  }, []);
  return (
    <>
      <Box sx={{my: 2}}>
        <Paper elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Productivity Leaderboard
          </Typography>
          <Box sx={{p: 2}}>
            <Link sx={{px: 2}} to={"/productivity-leaderboard"}>
              view all
            </Link>
          </Box>

          {loading ? (
            <CircularProgress sx={{display: "block", margin: "20px auto"}} />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default ProductivityLeaderBoard;
