import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import {
  CircularProgress,
  Alert,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";

const ProductivityLeaderBoardTable = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

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
      data: leaderboard.map((staff) => staff.percentage), // Backend calculated percentages
    },
  ];

  return (
    <div>
      <Paper elevation={3}>
        <Typography variant="h6" align="center" gutterBottom>
          Productivity Leaderboard
        </Typography>

        {loading ? (
          <CircularProgress sx={{display: "block", margin: "20px auto"}} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Box>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </Box>

            {/* Productivity Table */}
            <TableContainer sx={{mb: 3}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Total Hours</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Billed Hours</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Productivity %</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((staff, index) => (
                    <TableRow key={index}>
                      <TableCell>{staff.Name}</TableCell>
                      <TableCell align="center">{staff.total_hours}</TableCell>
                      <TableCell align="center">{staff.billed_hours}</TableCell>
                      <TableCell
                        align="center"
                        sx={{color: staff.percentage < 0 ? "red" : "green"}}
                      >
                        {staff.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ApexCharts Graph */}
          </>
        )}
      </Paper>
    </div>
  );
};

export default ProductivityLeaderBoardTable;
