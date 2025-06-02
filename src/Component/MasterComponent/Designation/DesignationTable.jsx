import React, {useState} from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const DesignationTable = ({
  isdesignationdata,
  removeDesignation,
  handleOpen,
  loading,
  search,
  page,
  totalPages,
  setPage,
  setSearch,
}) => {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  return (
    <div>
      <HeaderTab>
        <Button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            color: "white",
          }}
        >
          {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />}
        </Button>
      </HeaderTab>
      <TextField
        label="Search"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{mb: 2}}
      />
      {loading ? (
        <CircularProgress />
      ) : viewMode === "table" ? (
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="designation table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Designation Name</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isdesignationdata.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left">{item.Designation_Name}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => removeDesignation(item.Designation_Id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                    <Button onClick={() => handleOpen(item)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2} sx={{mt: 2}}>
          {isdesignationdata.map((item, index) => (
            <Grid size={{xs: 12, sm: 12, md: 12, lg: 6}} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">ID: {index + 1}</Typography>
                  <Typography variant="body1">
                    {item.Designation_Name}
                  </Typography>
                  <Button
                    onClick={() => removeDesignation(item.Designation_Id)}
                    color="error"
                    sx={{mt: 1}}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button onClick={() => handleOpen(item)}>
                    <EditIcon />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, val) => setPage(val)}
        sx={{mt: 2, display: "flex", justifyContent: "center"}}
      />
    </div>
  );
};

export default DesignationTable;
