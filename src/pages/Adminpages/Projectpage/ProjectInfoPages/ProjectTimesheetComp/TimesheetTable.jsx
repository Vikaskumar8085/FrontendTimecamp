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
  Card,
  Grid2,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import StatCard from "../../../../../common/StatCard/StatCard";

const TimesheetTable = ({
  data,
  approveprojectfunc,
  disapproveprojectfunc,
  billedprojectfunc,
  selectedItems,
  setSelectedItems,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalHoursSum = data.reduce(
    (sum, item) => sum + parseInt(item.hours),
    0
  );
  const totalEntriesSum = data.length;
  const totalBilledHoursSum = data.reduce(
    (sum, item) => sum + item.billed_hours,
    0
  );
  const totalOkHoursSum = data.reduce((sum, item) => sum + item.ok_hours, 0);

  // export to excel
  const exportToExcel = () => {
    const formattedData = data.map(({_id, __v, ...rest}) => ({
      ...rest,
      CompanyImage: "https://example.com/company-logo.png", // Replace with actual image URL if available
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Timesheet.xlsx");
  };

  // export to excel

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid2 container spacing={2} sx={{my: 1}}>
        <Grid2 size={{md: 3, lg: 3, sm: 12, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 12, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 12, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 12, xs: 12}}>
          <StatCard />
        </Grid2>
      </Grid2>
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
      <Button
        variant="contained"
        sx={{backgroundColor: "#2c3e50", my: 1}}
        onClick={exportToExcel}
      >
        <DownloadIcon />
      </Button>

      {selectedItems.length > 0 ? (
        <div sx={{margin: "10px 0px"}}>
          <Button
            sx={{
              backgroundColor: "Green",
              color: "white",
              margin: "10px 0px",
              padding: "5px 10px",
            }}
            onClick={() => approveprojectfunc(selectedItems)}
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
            onClick={() => disapproveprojectfunc(selectedItems)}
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
            onClick={() => billedprojectfunc(selectedItems)}
          >
            Billed
          </Button>
        </div>
      ) : null}
      <Paper sx={{width: "100%", overflow: "hidden"}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Approval Status</TableCell>
                <TableCell>Billing Status</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <FormControlLabel
                        key={row.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(row.Timesheet_Id)}
                            onChange={() =>
                              handleCheckboxChange(row.Timesheet_Id)
                            }
                          />
                        }
                        label={row.name}
                      />
                    </TableCell>
                    <TableCell>{row.ProjectName.join(", ")}</TableCell>
                    <TableCell>{row.StaffName.join(", ")}</TableCell>
                    <TableCell>{row.task_description}</TableCell>
                    <TableCell>{row.hours}</TableCell>
                    <TableCell>{row.approval_status}</TableCell>
                    <TableCell>{row.billing_status}</TableCell>
                    <TableCell>{row.day}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TimesheetTable;
