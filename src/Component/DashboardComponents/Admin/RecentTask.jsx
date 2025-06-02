import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const RecentTask = () => {
  const [IsRecentTaskData, setIsRecentTaskData] = useState([]);

  const fetchrecenttaskfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-recent-project"
      );
      if (response?.data?.success) {
        setIsRecentTaskData(response?.data?.result);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchrecenttaskfunc();
  }, [0]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Typography sx={{fontSize: "1.4em", p: 1}}>Recent Task</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Estimated Time hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsRecentTaskData.length !== 0
              ? IsRecentTaskData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.FirstName}</TableCell>
                      <TableCell>{item?.Estimated_Time}</TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentTask;
