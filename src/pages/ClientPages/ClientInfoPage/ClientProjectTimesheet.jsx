import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2,
} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import StatCard from "../../../common/StatCard/StatCard";
import InputSearch from "../../../common/InputSearch/InputSearch";
import Pagination from "../../../common/Pagination/Pagination";

const ClientProjectTimesheet = ({
  isClientTimesheetdata,
  ApproveFunc,
  disApproveFunc,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(selectedItems);
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };
  const formatDate = (excelDate) => {
    if (!excelDate) return "N/A";
    return new Date(
      (parseFloat(excelDate) - 25569) * 86400000
    ).toLocaleDateString();
  };

  return (
    <>
      <div>
        <BreadCrumb pageName="Client Project Timesheet " />

        <Grid2 container spacing={2} sx={{my: 2}}>
          <Grid2 size={{sm: 12, md: 3, lg: 3}}>
            <StatCard />
          </Grid2>
          <Grid2 size={{sm: 12, md: 3, lg: 3}}>
            <StatCard />
          </Grid2>
          <Grid2 size={{sm: 12, md: 3, lg: 3}}>
            <StatCard />
          </Grid2>
          <Grid2 size={{sm: 12, md: 3, lg: 3}}>
            <StatCard />
          </Grid2>
        </Grid2>

        <div
          style={{
            display: "block",
            overflow: "hidden",
            position: "relative",
            margin: "10px 0px",
          }}
          className="client_header_container"
        >
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="left_div">
              <Button>Sort</Button>
            </div>
            <div className="right_div">
              <InputSearch />
            </div>
          </div>
        </div>

        {selectedItems.length > 0 ? (
          <div sx={{margin: "10px 0px"}}>
            <Button
              onClick={() => ApproveFunc(selectedItems)}
              sx={{
                backgroundColor: "Green",
                color: "white",
                margin: "10px 0px",
                padding: "5px 10px",
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => disApproveFunc(selectedItems)}
              sx={{
                backgroundColor: "red",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
            >
              DisApprove
            </Button>
          </div>
        ) : null}

        <TableContainer
          component={Paper}
          sx={{mt: 3, boxShadow: 3, borderRadius: 2}}
        >
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: "#f5f5f5"}}>
                <TableCell>
                  <strong>select Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Task Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Project ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Priority</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell>
                  <strong>End Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Estimated Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Completed Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Staff ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Timesheet ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Approval Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Billed Hours</strong>
                </TableCell>
                <TableCell>
                  <strong>Remarks</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isClientTimesheetdata?.map((item) =>
                item?.timesheets?.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControlLabel
                        key={task.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(task.Timesheet_Id)}
                            onChange={() =>
                              handleCheckboxChange(task.Timesheet_Id)
                            }
                          />
                        }
                        label={item.name}
                      />
                    </TableCell>
                    <TableCell>{task.Task_Name}</TableCell>
                    <TableCell>{task.ProjectId}</TableCell>
                    <TableCell>
                      <Chip
                        label={task.Priority}
                        color={task.Priority === "HIGH" ? "error" : "primary"}
                      />
                    </TableCell>
                    <TableCell>{formatDate(task.StartDate)}</TableCell>
                    <TableCell>{formatDate(task.EndDate)}</TableCell>
                    <TableCell>{task.Estimated_Time} hrs</TableCell>
                    <TableCell>{task.Completed_time} hrs</TableCell>
                    <TableCell>
                      <Chip
                        label={task.Status}
                        color={
                          task.Status === "COMPLETED" ? "success" : "warning"
                        }
                      />
                    </TableCell>
                    <TableCell>{task.Description}</TableCell>
                    <TableCell>{task.Staff_Id}</TableCell>
                    <TableCell>{task.Timesheet_Id}</TableCell>
                    <TableCell>{task.approval_status}</TableCell>
                    <TableCell>{task.billed_hours}</TableCell>
                    <TableCell>{task.remarks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination />
      </div>
    </>
  );
};

export default ClientProjectTimesheet;
