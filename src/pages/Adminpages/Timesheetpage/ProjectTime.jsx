import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Card,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import {fetchProjectTimeapicall} from "../../../ApiServices/TimesheetApiServices";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatCard from "../../../common/StatCard/StatCard";
import apiInstance from "../../../ApiInstance/apiInstance";

const ProjectTime = () => {
  const [Isprojecttimedata, setIsprojectTimedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // sum entries
  const totalHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + item.TotalHours,
    0
  );
  const totalEntriesSum = Isprojecttimedata.reduce(
    (sum, item) => sum + item.TotalEntries,
    0
  );
  const totalBilledHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + item.BilledHours,
    0
  );
  const totalOkHoursSum = Isprojecttimedata.reduce(
    (sum, item) => sum + item.OkHours,
    0
  );

  // sum entries

  const getprojecttimefunc = async () => {
    try {
      const response = await fetchProjectTimeapicall({
        params: {
          search,
          page: page + 1, // Backend uses 1-based indexing
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsprojectTimedata(response.result);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const [cards, setCards] = useState([]);

  const fetchprojecttimeStatCardFunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v1/admin/project-time-stat-card"
      );
      setCards(response?.data?.data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getprojecttimefunc();
  }, [search, page, rowsPerPage]);

  useEffect(() => {
    fetchprojecttimeStatCardFunc();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Project Time" />

      <Grid2 container spacing={3} sx={{my: 1}}>
        {cards.map((card, index) => (
          <Grid2 key={index} size={{xs: 12, md: 3, lg: 3}}>
            <StatCard
              index={index}
              title={card.title}
              value={card.value}
              unit={card.unit}
              percentage={card.percentage}
              trendDown={card.trendDown}
              chartData={card.chartData}
            />
          </Grid2>
        ))}
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

      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{my: 2}}
      />

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Total Hour</TableCell>
              <TableCell>Total Entries</TableCell>
              <TableCell>Total Billed Hours</TableCell>
              <TableCell>Total Ok Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Isprojecttimedata.length > 0 ? (
              Isprojecttimedata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.ProjectName}</TableCell>
                  <TableCell>{item.TotalHours}</TableCell>
                  <TableCell>{item.TotalEntries}</TableCell>
                  <TableCell>{item.BilledHours}</TableCell>
                  <TableCell>{item.OkHours}</TableCell>
                  <TableCell>
                    <Link
                      style={{color: "#2c3e50"}}
                      to={`/project-info/${item.ProjectId}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  {/* <Empty /> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset to page 0 when changing rows per page
        }}
      />
    </LayoutDesign>
  );
};

export default ProjectTime;
