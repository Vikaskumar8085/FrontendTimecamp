import React, {useEffect, useState} from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";

const RecentTimesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-recent-timesheet"
      );
      if (response.data.success) {
        setTimesheets(response.data.result);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch timesheets. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{my: 2}}>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{py: 2, px: 1}} gutterBottom align="start">
          Recent Timesheets
        </Typography>

        {loading ? (
          <CircularProgress sx={{display: "block", margin: "20px auto"}} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Staff Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Hours Worked</strong>
                </TableCell>
                <TableCell>
                  <strong>Time Ago</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timesheets.length > 0 ? (
                timesheets.map((timesheet, index) => (
                  <TableRow key={index}>
                    <TableCell>{timesheet.staffName}</TableCell>
                    <TableCell>{timesheet.hours}</TableCell>
                    <TableCell>{timesheet.timeAgo}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No timesheets found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default RecentTimesheet;
