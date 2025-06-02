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
  TextField,
  TablePagination,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import GridViewIcon from "@mui/icons-material/GridView";
import TableViewIcon from "@mui/icons-material/TableView";
import Empty from "../../../common/EmptyFolder/Empty";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProjectTable = ({
  isProjectdata,
  setIsModalOpen,
  setIsEdit,
  search,
  setSearch,
  setLimit,
  limit,
  page,
  setPage,
  totalPages,
  handleDelete,
}) => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <>
      {isProjectdata.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">Project Name</th>
              <th className="table_head_data">Project Code </th>
              <th className="table_head_data">Project Hours </th>
              <th className="table_head_data">Start Date</th>
              <th className="table_head_data">End Date </th>
              <th className="table_head_data">Project Type</th>
              <th className="table_head_data">Action </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {isProjectdata?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{item.Project_Name}</td>
                    <td className="table_data">{item.Project_Code}</td>
                    <td className="table_data">{item.Project_Hours}</td>
                    <td className="table_data">{item.Start_Date}</td>
                    <td className="table_data">{item.End_Date}</td>
                    <td className="table_data">{item.Project_Type}</td>

                    <td className="table_data">
                      <Link to={`/project-info/${item.ProjectId}`}>
                        <VisibilityIcon />
                      </Link>
                      <Button
                        onClick={() => {
                          setIsEdit(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <EditIcon />
                      </Button>

                      <Button onClick={() => handleDelete(item.ProjectId)}>
                        Delete
                      </Button>
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

export default ProjectTable;
