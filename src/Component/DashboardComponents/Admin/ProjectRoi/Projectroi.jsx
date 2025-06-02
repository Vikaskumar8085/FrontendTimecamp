import React, {useEffect, useState} from "react";
import apiInstance from "../../../../ApiInstance/apiInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {ArrowUpward, ArrowDownward} from "@mui/icons-material";
const Projectroi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchprojectroifunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-project-roi"
      );
      if (response.data.success) {
        setData(response.data.result);
      } else {
        setError(response.data.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprojectroifunc();
  }, [0]);
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <div>
      <TableContainer component={Paper} sx={{mt: 4}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Project Name</strong>
              </TableCell>
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Estimated Time</strong>
              </TableCell>
              <TableCell>
                <strong>Completed Time</strong>
              </TableCell>
              <TableCell>
                <strong>Percentage</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.Project_Name?.[0] || "N/A"}</TableCell>
                <TableCell>{item.FirstName}</TableCell>
                <TableCell>{item.TotalEstimatedTime || 0} hrs</TableCell>
                <TableCell>{item.TotalCompletedTime || 0} hrs</TableCell>
                <TableCell>{item.Percentage.toFixed(2)}%</TableCell>
                <TableCell>
                  {item.Percentage >= 0 ? (
                    <ArrowUpward color="success" />
                  ) : (
                    <ArrowDownward color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Projectroi;
