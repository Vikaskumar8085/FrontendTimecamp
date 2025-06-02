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
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientinactiveprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeaderTab from "../../common/HeaderTab/HeaderTab";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../common/EmptyFolder/Empty";
import InputSearch from "../../common/InputSearch/InputSearch";

const ClientInactiveProject = () => {
  const [isclientinactiveproject, setIsclientinactiveproject] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [totalProjects, setTotalProjects] = useState(0);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false); // State to manage loading

  const fetchinactiveclientproject = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetchclientinactiveprojectapicall({
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: search,
        },
      });
      if (response.success) {
        setIsclientinactiveproject(response.result);
        setTotalProjects(response.totalProjects);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page when search changes
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const toggleView = () => {
    setView(view === "table" ? "grid" : "table");
  };

  useEffect(() => {
    fetchinactiveclientproject();
  }, [page, rowsPerPage, search]);

  return (
    <div>
      <LayoutDesign>
        <BreadCrumb pageName="Client Inactive Project" />

        <HeaderTab>
          <Button
            variant="contained"
            onClick={toggleView}
            sx={{backgroundColor: "#2c3e50"}}
          >
            {view === "table" ? <GridViewIcon /> : <TableRowsIcon />}
          </Button>
        </HeaderTab>

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

        {isclientinactiveproject.length ? (
          <table className="table_Container">
            <thead className="table_head">
              <tr className="head_row">
                <th className="table_head_data">Id</th>
                <th className="table_head_data">Project Name</th>
                <th className="table_head_data">Project Code </th>
                <th className="table_head_data">State Date </th>
                <th className="table_head_data">End Date</th>
                <th className="table_head_data">Project Hours</th>
                <th className="table_head_data">Actions</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {isclientinactiveproject?.map((item, index) => {
                return (
                  <>
                    <tr className="body_row" key={index}>
                      <td className="table_data">{index + 1}</td>
                      <td className="table_data">{item.Project_Name}</td>
                      <td className="table_data">{item.Project_Code}</td>
                      <td className="table_data">{item.Start_Date}</td>
                      <td className="table_data">{item.End_Date}</td>
                      <td className="table_data">{item.Project_Hours}</td>
                      <td className="table_data">
                        <Link to={`/client/client-pageinfo/${item?.ProjectId}`}>
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
      </LayoutDesign>
    </div>
  );
};

export default ClientInactiveProject;
