import React, {useEffect, useState} from "react";
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
  CircularProgress,
  TablePagination,
  Chip,
} from "@mui/material";
import {fetchactiveemployeeapicall} from "../../../ApiServices/AdminApiServices/Employee";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Grid from "@mui/material/Grid2";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import EditIcon from "@mui/icons-material/Edit";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
const ActiveEmployee = () => {
  const [viewMode, setViewMode] = useState("table");
  const [IsactiveEmployeedata, setIsactiveEmployeedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // Page starts from 0 in TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalCount, setTotalCount] = useState(0);
  const getactiveemployee = async () => {
    try {
      const response = await fetchactiveemployeeapicall({
        params: {
          search,
          page: page + 1, // Backend usually expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsactiveEmployeedata(response.result);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getactiveemployee();
  }, [search, page, rowsPerPage]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Active Employee" />

        {IsactiveEmployeedata.length > 0 ? (
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
              {IsactiveEmployeedata?.map((item, index) => {
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

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Reset page to 0 when changing rows per page
          }}
        />
      </LayoutDesign>
    </>
  );
};

export default ActiveEmployee;
