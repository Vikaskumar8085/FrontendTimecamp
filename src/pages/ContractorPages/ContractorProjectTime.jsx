import React, {useEffect, useState} from "react";
import {
  Card,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";
import Empty from "../../common/EmptyFolder/Empty";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorProjectTime = () => {
  const [iscontractorprojectdata, setiscontractorprojectdata] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // Sum calculations
  const totalHoursSum = iscontractorprojectdata.reduce(
    (sum, item) => sum + (item.TotalHours || 0),
    0
  );
  const totalEntriesSum = iscontractorprojectdata.reduce(
    (sum, item) => sum + (item.TotalEntries || 0),
    0
  );
  const totalBilledHoursSum = iscontractorprojectdata.reduce(
    (sum, item) => sum + (item.BilledHours || 0),
    0
  );
  const totalOkHoursSum = iscontractorprojectdata.reduce(
    (sum, item) => sum + (item.OkHours || 0),
    0
  );

  const fetchcontractorprojecttimefunc = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-project-time",
        {
          params: {search, page: page + 1, limit},
        }
      );

      if (response?.data?.success) {
        setiscontractorprojectdata(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.total);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchcontractorprojecttimefunc();
  }, [page, limit, search]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Contractor Project Time" />
      <Grid container spacing={2} sx={{my: 2}}>
        <Grid item sm={12} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AccessTime color="primary" />
            <Typography variant="h6">Total Hours: {totalHoursSum}</Typography>
          </Card>
        </Grid>
        <Grid item sm={12} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
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
        </Grid>
        <Grid item sm={12} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
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
        </Grid>
        <Grid item sm={12} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
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
        </Grid>
      </Grid>

      <TextField
        label="Search by Project Name or Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Data Table */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="Project Time Table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Project Name</b>
                </TableCell>
                <TableCell>
                  <b>Total Hours</b>
                </TableCell>
                <TableCell>
                  <b>Total Entries</b>
                </TableCell>
                <TableCell>
                  <b>Total Billed Hours</b>
                </TableCell>
                <TableCell>
                  <b>Total OK Hours</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iscontractorprojectdata.length > 0 ? (
                iscontractorprojectdata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.ProjectName || "N/A"}</TableCell>
                    <TableCell>{item.TotalHours || 0}</TableCell>
                    <TableCell>{item.TotalEntries || 0}</TableCell>
                    <TableCell>{item.BilledHours || 0}</TableCell>
                    <TableCell>{item.OkHours || 0}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Empty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={limit}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setLimit(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </LayoutDesign>
  );
};

export default ContractorProjectTime;
