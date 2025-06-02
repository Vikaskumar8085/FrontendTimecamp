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
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import Empty from "../../../common/EmptyFolder/Empty";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const ContractorTable = ({
  Iscontractordata,
  setIsEdit,
  setIsOpen,
  loading,
  search,
  page,
  rowsPerPage,
  totalCount,
  setRowsPerPage,
  setPage,
  setSearch,
}) => {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  return (
    <>
      {Iscontractordata.length > 0 ? (
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
            {Iscontractordata?.map((item, index) => {
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
                      <Link to={`/contractor-info/${item.staff_Id}`}>
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
    </>
  );
};

export default ContractorTable;
