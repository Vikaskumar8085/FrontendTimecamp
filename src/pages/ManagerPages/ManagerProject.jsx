import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import React, {useEffect, useState} from "react";
import {
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Button,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import apiInstance from "../../ApiInstance/apiInstance";
import ManageProjectForm from "../../Component/ManagerComponents/ManageProjectForm";
import {
  createManagerProjectapicall,
  updatemanagerprojectapicall,
} from "../../ApiServices/ManagerApiServices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {Link} from "react-router-dom";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";
import toast from "react-hot-toast";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";
const ManagerProject = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [IsEdit, setIsEdit] = useState(null);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useDispatch();

  const fetchprojects = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-project"
      );
      console.log(response, "adfsfdsdfsd");
      setData(response.data.result);
      // setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createManagerProjectapicall(value);
      console.log(response, "response");
      if (response?.success) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchprojects();
        toast.success(response?.message);
      } else {
        fetchprojects();
        setIsOpen(false);
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsOpen(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateprojecthandleSubmit = async (value) => {
    try {
      const val = {
        id: IsEdit?.ProjectId,
        payload: value,
      };

      console.log(val, "value");
      dispatch(setLoader(true));
      const response = await updatemanagerprojectapicall(val);

      if (response?.success) {
        dispatch(setLoader(false));
        setIsOpen(false);
        fetchprojects();
        toast.success(response?.message);
      } else {
        dispatch(setLoader(true));
        setIsOpen(false);
        fetchprojects();
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  // const handleSearchChange = (event) => {
  //   setSearch(event.target.value);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const displayedProjects = data
  //   .flatMap((item) => [...item.fetchproject, ...item.fetchteamproject])
  //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    fetchprojects();
  }, [0]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="ManagerProject" />

      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Create Project
      </Button>
      {IsOpen && (
        <TModal
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
            setIsEdit(null);
          }}
          title="Create Project "
        >
          <ManageProjectForm
            updateprojecthandleSubmit={updateprojecthandleSubmit}
            IsEdit={IsEdit}
            handleSubmit={handleSubmit}
          />
        </TModal>
      )}
      <Paper sx={{width: "100%", overflow: "hidden", padding: 2}}>
        {/* <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{marginBottom: 2}}
        /> */}

        {/* Data Table */}
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
                {data?.map((item, index) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>{item.Project_Name}</TableCell>
                        <TableCell>{item.Project_Code}</TableCell>
                        <TableCell>{item.Start_Date}</TableCell>
                        <TableCell>{item.End_Date}</TableCell>
                        <TableCell>{item.Project_Type}</TableCell>
                        <TableCell>{item.Project_Hours}</TableCell>
                        <TableCell>
                          {item.Project_Status ? "active" : "inactive"}
                        </TableCell>
                        <TableCell>{item.ClientName}</TableCell>

                        <TableCell>
                          <Link to={`/manager/project-info/${item?.ProjectId}`}>
                            view
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              setIsEdit(item);
                              setIsOpen(true);
                            }}
                          >
                            edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination />
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </LayoutDesign>
  );
};

export default ManagerProject;
