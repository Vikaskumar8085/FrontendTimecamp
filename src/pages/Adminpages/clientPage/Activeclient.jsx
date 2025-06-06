import React, {useState, useCallback, useEffect} from "react";
import {fetchactiveclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import Empty from "../../../common/EmptyFolder/Empty";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  TablePagination,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Activeclient = () => {
  const [isactiveclientdata, setIsactiveclientdata] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const getactiveclient = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchactiveclientapicall({
        params: {
          search,
          page: page + 1, // Backend expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsactiveclientdata(response.result);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Error fetching clients:", error?.message);
    } finally {
      setLoading(false);
    }
  }, [search, page, rowsPerPage]);

  // Fetch data on component mount & when dependencies change
  useEffect(() => {
    getactiveclient();
  }, [getactiveclient]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page on new search
  };

  // Handle pagination changes
  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Active Client" />
      <HeaderTab>
        <Button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "0px 10px",
            color: "white",
          }}
        >
          {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
        </Button>
      </HeaderTab>

      {/* Search Input */}
      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{mb: 2}}
      />

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : viewMode === "table" ? (
        <Grid container spacing={2}>
          <Grid size={{sm: 12}}>
            <table className="table_Container">
              <thead className="table_head">
                <tr className="head_row">
                  <th className="table_head_data">Id</th>
                  <th className="table_head_data">Company Name</th>
                  <th className="table_head_data">Client Name </th>
                  <th className="table_head_data">Client Email </th>
                  <th className="table_head_data">Client Address</th>
                  <th className="table_head_data">Client Postal Code </th>
                  <th className="table_head_data">Gst Numar</th>
                  <th className="table_head_data">Status </th>
                  <th className="table_head_data">Action </th>
                </tr>
              </thead>
              <tbody className="table_body">
                {isactiveclientdata?.map((item, index) => {
                  return (
                    <>
                      <tr className="body_row" key={index}>
                        <td className="table_data">{index + 1}</td>
                        <td className="table_data">{item.Company_Name}</td>
                        <td className="table_data">{item.Client_Name}</td>
                        <td className="table_data">{item.Client_Phone}</td>
                        <td className="table_data">{item.Client_Address}</td>
                        <td className="table_data">
                          {item.Client_Postal_Code}
                        </td>
                        <td className="table_data">{item.GstNumber}</td>
                        <td className="table_data">
                          {
                            <Chip
                              label={item.Client_Status || "Unknown"}
                              color={
                                item.Client_Status === "COMPLETED"
                                  ? "success"
                                  : item.Client_Status === "INPROGRESS"
                                  ? "primary"
                                  : item.Client_Status === "P"
                                  ? "warning"
                                  : "default"
                              }
                            />
                          }
                        </td>

                        <td className="table_data">
                          <Link
                            style={{textDecoration: "none"}}
                            to={`/client-info/${item.Client_Id}`}
                          >
                            <VisibilityIcon />
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {isactiveclientdata.length > 0 ? (
            isactiveclientdata.map((item, index) => (
              <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Company_Name}</Typography>
                    <Typography>Name: {item.Client_Name}</Typography>
                    <Typography>Email: {item.Client_Email}</Typography>
                    <Typography>Phone: {item.Client_Phone}</Typography>
                    <Typography>Address: {item.Client_Address}</Typography>
                    <Typography>
                      Postal Code: {item.Client_Postal_Code}
                    </Typography>
                    <Typography>Gst Number: {item.GstNumber}</Typography>
                    <Typography>
                      Status:{" "}
                      <Chip
                        label={item.Client_Status}
                        color={
                          item.Client_Status === "Active"
                            ? "success"
                            : item.Client_Status === "InActive"
                            ? "warning"
                            : "error"
                        }
                      />
                    </Typography>
                    <Link
                      style={{textDecoration: "none"}}
                      to={`/client-info/${item.Client_Id}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid size={{sm: 12}} display="flex" justifyContent="center">
              <Empty />
            </Grid>
          )}
        </Grid>
      )}

      <TablePagination
        component="div"
        count={totalPages * rowsPerPage} // Total items count
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </LayoutDesign>
  );
};

export default Activeclient;
