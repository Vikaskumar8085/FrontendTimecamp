import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
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
  Grid2,
} from "@mui/material";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";
import Empty from "../../common/EmptyFolder/Empty";
import apiInstance from "../../ApiInstance/apiInstance";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import StatCard from "../../common/StatCard/StatCard";
import Button from "../../common/Button/Button";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";

const ManagerProjectTime = () => {
  const [Isprojecttimedata, setIsprojecttimedata] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // Sum calculations
  const totalHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + (item.TotalHours || 0),
    0
  );
  const totalEntriesSum = Isprojecttimedata.reduce(
    (sum, item) => sum + (item.TotalEntries || 0),
    0
  );
  const totalBilledHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + (item.BilledHours || 0),
    0
  );
  const totalOkHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + (item.OkHours || 0),
    0
  );

  const fetchmanagerprojectTimeFunc = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-project-time",
        {
          params: {search, page: page + 1, limit},
        }
      );

      if (response?.data?.success) {
        setIsprojecttimedata(response.data.result);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmanagerprojectTimeFunc();
  }, [page, limit, search]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Manager Project Time" />

      <Grid2 container spacing={3}>
        <Grid2 size={{md: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
      </Grid2>
      {/* Summary Cards */}
      {/* <Grid container spacing={2} sx={{my: 2}}>
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
      </Grid> */}

      {/* Search Field */}
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
              {Isprojecttimedata.length > 0 ? (
                Isprojecttimedata.map((item, index) => (
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
      {/* <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={limit}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setLimit(parseInt(event.target.value, 10));
          setPage(0);
        }}
      /> */}

      <Pagination />
    </LayoutDesign>
  );
};

export default ManagerProjectTime;
