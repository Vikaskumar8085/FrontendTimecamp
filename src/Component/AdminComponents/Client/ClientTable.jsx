import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TablePagination,
  TextField,
  Chip,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const ClientTable = ({
  Isclientdata,
  handleOpen,
  removeclientfunc,
  setSearch,
  search,
  setRowsPerPage,
  totalClients,
  rowsPerPage,
  page,
  setPage,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div>
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
      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // Reset page when searching
        }}
        sx={{mb: 2}}
      />

      {viewMode === "table" ? (
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
                {Isclientdata?.map((item, index) => {
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
                          <Button
                            onClick={() => handleOpen(item)}
                            color="primary"
                          >
                            <EditIcon />
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {Isclientdata.length > 0 ? (
            Isclientdata.map((item, index) => (
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
                    <Button onClick={() => handleOpen(item)} color="primary">
                      <EditIcon />
                    </Button>
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
        count={totalClients}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default ClientTable;
