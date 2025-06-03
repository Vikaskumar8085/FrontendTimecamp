import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import React, {useEffect, useState} from "react";
import {
  Paper,
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";

import apiInstance from "../../ApiInstance/apiInstance";
import {Link} from "react-router-dom";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";

const ManagerProjectActive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchprojects = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-active-project"
      );

      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const displayedProjects = data
  //   .flatMap((item) => [...item])
  //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    fetchprojects();
  }, [0]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Manager Active project" />

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
      <Paper sx={{width: "100%", overflow: "hidden", padding: 2}}>
        {/* Data Table */}
        <TableContainer sx={{mt: 3}}>
          <Typography variant="h6" sx={{p: 2}}>
            Project List
          </Typography>
          {loading ? (
            <CircularProgress sx={{display: "block", margin: "20px auto"}} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Project Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Project Code</b>
                  </TableCell>
                  <TableCell>
                    <b>Start Date</b>
                  </TableCell>
                  <TableCell>
                    <b>End Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Project Type</b>
                  </TableCell>
                  <TableCell>
                    <b>Hours</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((project, index) => (
                  <>
                    <TableRow key={project._id}>
                      <TableCell>{project.Project_Name}</TableCell>
                      <TableCell>{project.Project_Code}</TableCell>
                      <TableCell>{project.Start_Date}</TableCell>
                      <TableCell>{project.End_Date}</TableCell>
                      <TableCell>{project.Project_Type}</TableCell>
                      <TableCell>{project.Project_Hours}</TableCell>
                      <TableCell>
                        {project.Project_Status ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/manager/project-info/${project?.ProjectId}`}
                        >
                          view
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={
     
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>

      <Pagination />
    </LayoutDesign>
  );
};

export default ManagerProjectActive;
