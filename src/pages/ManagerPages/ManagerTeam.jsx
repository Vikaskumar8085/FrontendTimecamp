import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import moment from "moment";
import {Link} from "react-router-dom";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ManagerTeam = () => {
  const [managers, setManagers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchManagers = async () => {
    try {
      const {data} = await apiInstance.get("/v2/manager/fetch-manager-team", {
        params: {
          page: page + 1, // API expects 1-based index
          limit: rowsPerPage,
          search,
          sortBy,
          order,
        },
      });
      setManagers(data.result);
      setTotalRecords(data.totalRecords);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };
  useEffect(() => {
    fetchManagers();
  }, [page, rowsPerPage, search, sortBy, order]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="ManagerTeam" />
      <Paper sx={{width: "100%", overflow: "hidden", padding: 2}}>
        {/* Search Input */}
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{marginBottom: 2}}
        />

        {/* Sorting Dropdown */}
        {/* <FormControl sx={{minWidth: 120, marginBottom: 2}}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl> */}

        {/* Sorting Order Dropdown */}
        {/* <FormControl sx={{minWidth: 120, marginBottom: 2, marginLeft: 2}}>
          <InputLabel>Order</InputLabel>
          <Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl> */}

        {/* Data Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Social Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.map((manager, index) => (
                <TableRow key={manager.staff_Id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{manager.FirstName}</TableCell>
                  <TableCell>{manager.LastName}</TableCell>
                  <TableCell>{manager.UserName}</TableCell>
                  <TableCell>{manager.Email}</TableCell>
                  <TableCell>{manager.Phone}</TableCell>
                  <TableCell>
                    {moment(manager.Joining_Date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <a href={manager?.Social_Links}>view</a>
                  </TableCell>
                  <TableCell>
                    <Link to={`/manager/Team-info/${manager.staff_Id}`}>
                      team Info
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </LayoutDesign>
  );
};

export default ManagerTeam;
