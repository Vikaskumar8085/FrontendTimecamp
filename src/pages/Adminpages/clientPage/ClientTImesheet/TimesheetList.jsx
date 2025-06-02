import React, {useState} from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Chip,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const TimesheetList = ({
  data,
  biiledclienttimesheet,
  approveclienttimesheet,
  disapprovedclienttimesheet,
  setSelectedItems,
  selectedItems,
}) => {
  const [currentPage, setCurrentPage] = useState(0); // MUI pages start from 0

  const rowsPerPage = 5;

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Timesheet Records
      </Typography>
      {selectedItems.length > 0 ? (
        <div>
          <Button
            sx={{
              backgroundColor: "Green",
              color: "white",
              margin: "10px 0px",
              padding: "5px 10px",
            }}
            onClick={() => approveclienttimesheet(selectedItems)}
          >
            Approve
          </Button>
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              margin: "10px 10px",
              padding: "5px 10px",
            }}
            onClick={() => disapprovedclienttimesheet(selectedItems)}
          >
            Disapprove
          </Button>
          <Button
            sx={{
              backgroundColor: "skyblue",
              color: "white",
              margin: "10px 10px",
              padding: "5px 10px",
            }}
            onClick={() => biiledclienttimesheet(selectedItems)}
          >
            Billed
          </Button>
        </div>
      ) : null}
      {data?.result?.length === 0 ? (
        <Typography color="textSecondary">No timesheets available.</Typography>
      ) : (
        data?.result?.map((entry, index) => (
          <Card key={index} sx={{mb: 3, boxShadow: 3}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Member: {entry.MemberName.join(", ") || "N/A"}
              </Typography>

              {entry?.timesheetdata?.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{backgroundColor: "#f5f5f5"}}>
                        <TableCell>
                          <strong>Select </strong>
                        </TableCell>
                        <TableCell>
                          <strong>Timesheet ID</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Task</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Hours</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Approval Status</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Billing Status</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Remarks</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Date</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {entry?.timesheetdata
                        ?.slice(
                          currentPage * rowsPerPage,
                          currentPage * rowsPerPage + rowsPerPage
                        )
                        ?.map((timesheet) => (
                          <TableRow key={timesheet._id}>
                            <TableCell>
                              <FormControlLabel
                                key={timesheet.Timesheet_Id}
                                control={
                                  <Checkbox
                                    checked={selectedItems.includes(
                                      timesheet.Timesheet_Id
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        timesheet.Timesheet_Id
                                      )
                                    }
                                  />
                                }
                                label={timesheet.name}
                              />
                            </TableCell>
                            <TableCell>{timesheet._id}</TableCell>
                            <TableCell>
                              {timesheet.task_description || "N/A"}
                            </TableCell>
                            <TableCell>{timesheet.hours} hrs</TableCell>
                            <TableCell>
                              <Chip
                                label={timesheet.approval_status || "Pending"}
                                color={
                                  timesheet.approval_status === "PENDING"
                                    ? "warning"
                                    : "success"
                                }
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={timesheet.billing_status || "Unbilled"}
                                color={
                                  timesheet.billing_status === "BILLED"
                                    ? "primary"
                                    : "default"
                                }
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{timesheet.remarks || "N/A"}</TableCell>
                            <TableCell>{timesheet.day || "N/A"}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="textSecondary">
                  No timesheets available.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data?.pagination?.totalItems}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]} // Fixed page size
      />
    </Box>
  );
};

export default TimesheetList;
