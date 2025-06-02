import React, {useEffect, useState} from "react";
import {fetchemployeeactiveprojectapicall} from "../../ApiServices/EmployeeApiservices/Employee";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";
import {VisibilitySharp} from "@mui/icons-material";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";

const EmployeeActiveProject = () => {
  const [isemployeeActiveproject, setIsemployeeactiveproject] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [totalProjects, setTotalProjects] = useState(0);
  const fetchemployeeactiveproject = async () => {
    try {
      const response = await fetchemployeeactiveprojectapicall({
        params: {limit: rowsPerPage, page: page + 1, search},
      });
      if (response.success) {
        setIsemployeeactiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchemployeeactiveproject();
  }, [page, rowsPerPage, search]);
  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Employee Active Project" />
        {/* text field */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px",
          }}
        >
          <div className="left_div">{/* <Button>Sort</Button> */}</div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
        {/* text fields */}
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Project Status</TableCell>
                <TableCell align="left">Project Type</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isemployeeActiveproject?.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>{item.Project_Hours}</TableCell>
                      <TableCell>
                        {item.Project_Status === true ? "Active" : "InActive"}
                      </TableCell>
                      <TableCell>{item.Project_Type}</TableCell>
                      <TableCell>
                        {new Date(item.Start_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.End_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/employee/employee-project-info/${item.ProjectId}`}
                        >
                          <VisibilitySharp />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination />
        {/* <TablePagination
          component="div"
          count={totalProjects}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </LayoutDesign>
    </>
  );
};

export default EmployeeActiveProject;
