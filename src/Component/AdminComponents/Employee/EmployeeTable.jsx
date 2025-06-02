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
  TablePagination,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import {Link} from "react-router-dom";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const EmployeeTable = ({
  IsEmployeeData,
  setIsEdit,
  setisOpen,
  loading,
  search,
  page,
  rowsPerPage,
  totalCount,
  setRowsPerPage,
  setPage,
  setSearch,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div>
      <HeaderTab>
        <Button
          variant="contained"
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
        label="Search"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{mb: 2}}
      />

      {IsEmployeeData.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">FirstName</th>
              <th className="table_head_data">LastName </th>
              <th className="table_head_data">UserName </th>
              <th className="table_head_data">Email</th>
              <th className="table_head_data">Phone </th>
              <th className="table_head_data">Manager</th>
              <th className="table_head_data">Address </th>
              <th className="table_head_data">Action </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {IsEmployeeData?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{item.FirstName}</td>
                    <td className="table_data">{item.LastName}</td>
                    <td className="table_data">{item.UserName}</td>
                    <td className="table_data">{item.Email}</td>
                    <td className="table_data">{item.Phone}</td>
                    <td className="table_data">
                      {
                        <Chip
                          label={item.Manager || "NA"}
                          color={item.Manager ? "success" : "error"}
                        />
                      }
                    </td>
                    <td className="table_data">{item.Address}</td>

                    <td className="table_data">
                      <Link to={`/employee-info/${item.staff_Id}`}>
                        <VisibilityIcon />
                      </Link>
                      <Button
                        onClick={() => {
                          setIsEdit(item);
                          setisOpen(true);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      ;
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default EmployeeTable;
