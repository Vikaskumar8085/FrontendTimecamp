import React, { useCallback, useEffect, useState } from "react";
import {
  createemployeeprojectapicall,
  fetchemployeeprojectsapicall,
} from "../../ApiServices/EmployeeApiservices/Employee";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Input from "../../common/Input/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TablePagination,
  CircularProgress,
  Drawer,
  TextField,
  Grid2,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmpProjectForm from "../../Component/EmployeeComponents/EmpProjectForm";
import Empty from "../../common/EmptyFolder/Empty";
import { VisibilitySharp } from "@mui/icons-material";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";
import { setLoader } from "../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../ApiInstance/apiInstance";
import InputSearch from "../../common/InputSearch/InputSearch";

const EmployeeProjects = () => {
  const userdata = useSelector((state) => state?.user.values);
  const dispatch = useDispatch();
  const [Isemployeeprojectdata, setIsemployeeprojectdata] = useState([]);
  // states
  console.log(Isemployeeprojectdata, "Isemployeeprojectdata");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({});
  // states

  const [IsOpen, setIsOpen] = useState(false);
  const fetchemployeeproject = async () => {
    try {
      const response = await fetchemployeeprojectsapicall({
        params: {
          page: page + 1, // API expects 1-based page
          limit: rowsPerPage,
          search,
        },
      });
      if (response.success) {
        setIsemployeeprojectdata(response.result);
        setPagination(response.result.pagination);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchemployeeproject();
  }, [page, rowsPerPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = useCallback(async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createemployeeprojectapicall(value);
      dispatch(setLoader(false));
      if (response?.success) {
        dispatch(setLoader(false));
        setIsOpen(false);
        toast.success(response?.message);
        fetchemployeeproject();
      } else {
        dispatch(setLoader(false));
        setIsOpen(false);
        toast.success(response?.message);
        fetchemployeeproject();
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsOpen(false);
      fetchemployeeproject();
      toast.error(error?.response?.data?.message);
    }
  }, []);

  // useEffect(() => {
  //   dispatch(setLoader(false));
  // });
  return (
    <div>
      <LayoutDesign>
        <BreadCrumb pageName="Employee Projects" />

        {userdata?.Permission && (
          <Button
            onClick={() => setIsOpen(true)}
            sx={{
              my: 2,
              background: "#2c3e50",
              color: "white",
              padding: "10px 15px",
            }}
          >
            Create Project
          </Button>
        )}

        {IsOpen && (
          <TModal
            open={IsOpen}
            onClose={() => setIsOpen(false)}
            title="Add Project"
          >
            <EmpProjectForm handleSubmit={handleSubmit} />
          </TModal>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div className="left_div">{/* <Button>Sort</Button> */}</div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Project Code</TableCell>
                    <TableCell>Project status</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Isemployeeprojectdata?.map((item, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.Project_Name}</TableCell>
                          <TableCell>{item.Project_Code}</TableCell>
                          <TableCell>{item.Project_Status}</TableCell>
                          <TableCell>
                            {item.Project_Status === true
                              ? "Active"
                              : "InActive"}
                          </TableCell>
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
            <TablePagination
              component="div"
              count={
                (pagination?.totalManaged || 0) +
                (pagination?.totalEmployee || 0)
              }
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </LayoutDesign>
    </div>
  );
};

export default EmployeeProjects;
