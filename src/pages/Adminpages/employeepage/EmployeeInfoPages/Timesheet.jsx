import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Grid2,
  Card,
  Button,
} from "@mui/material";

const Timesheet = ({
  data,
  approveEmployeetimesheet,
  disapproveEmployeetimesheet,
  biiledEmployeetimesheet,
  selectedItems,
  setSelectedItems,
}) => {
  const {employeeTimesheets, projectManagerTimesheet} = data[0];
  const timesheets = [...employeeTimesheets, ...projectManagerTimesheet];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalHoursSum = timesheets.reduce(
    (sum, item) => sum + parseInt(item.hours),
    0
  );
  const totalEntriesSum = timesheets.length;
  const totalBilledHoursSum = timesheets.reduce(
    (sum, item) => sum + item.billed_hours,
    0
  );
  const totalOkHoursSum = timesheets.reduce(
    (sum, item) => sum + item.ok_hours,
    0
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <>

      {/* <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AccessTime color="primary" />
            <Typography variant="h6">Total Hours: {totalHoursSum}</Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <List color="secondary" />
            <Typography variant="h6">
              Total Entries: {totalEntriesSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Receipt color="success" />
            <Typography variant="h6">
              Total Billed Hours: {totalBilledHoursSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CheckCircle color="primary" />
            <Typography variant="h6">
              Total OK Hours: {totalOkHoursSum}
            </Typography>
          </Card>
        </Grid2>
      </Grid2> */}
      <TableContainer component={Paper} sx={{padding: "20px"}}>
        <Typography variant="h6" sx={{marginBottom: "10px"}}>
          Timesheets
        </Typography>

        {selectedItems.length > 0 ? (
          <div sx={{margin: "10px 0px"}}>
            <Button
              sx={{
                backgroundColor: "Green",
                color: "white",
                margin: "10px 0px",
                padding: "5px 10px",
              }}
              onClick={() => approveEmployeetimesheet(selectedItems)}
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
              onClick={() => disapproveEmployeetimesheet(selectedItems)}
            >
              DisApprove
            </Button>

            <Button
              sx={{
                backgroundColor: "skyblue",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
              onClick={() => biiledEmployeetimesheet(selectedItems)}
            >
              Billed
            </Button>
          </div>
        ) : null}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select Id</TableCell>
              <TableCell>Timesheet ID</TableCell>
              <TableCell>Staff ID</TableCell>
              <TableCell>Company ID</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Billing Status</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheets.length > 0 ? (
              timesheets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sheet) => (
                  <TableRow key={sheet._id}>
                    <TableCell>
                      <FormControlLabel
                        key={sheet.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(sheet.Timesheet_Id)}
                            onChange={() =>
                              handleCheckboxChange(sheet.Timesheet_Id)
                            }
                          />
                        }
                        label={sheet.name}
                      />
                    </TableCell>
                    <TableCell>{sheet.Timesheet_Id}</TableCell>
                    <TableCell>{sheet.Staff_Id}</TableCell>
                    <TableCell>{sheet.CompanyId || "N/A"}</TableCell>
                    <TableCell>{sheet.hours}</TableCell>
                    <TableCell>{sheet.project}</TableCell>
                    <TableCell>{sheet.task_description}</TableCell>
                    <TableCell>{sheet.approval_status}</TableCell>
                    <TableCell>{sheet.billing_status}</TableCell>
                    <TableCell>{sheet.start_time}</TableCell>
                    <TableCell>{sheet.end_time}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No timesheets available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={timesheets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default Timesheet;
