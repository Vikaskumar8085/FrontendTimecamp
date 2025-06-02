import React, {useEffect, useState} from "react";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import AddIcon from "@mui/icons-material/Add";
import {useFormik} from "formik";
import TModal from "../../common/Modal/TModal";
import Input from "../../common/Input/Input";
import TextArea from "../../common/TextArea/TextArea";
import InputFIleupload from "../../common/InputFileupload/InputFileupload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import InputSelect from "../../common/InputSelect/InputSelect";
import Pagination from "../../common/Pagination/Pagination";
import InputSearch from "../../common/InputSearch/InputSearch";
const Taskpage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);
  console.log(Isprojectmilestonedata, "daa");
  const fetchmanagertaskmilestonesfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-projectwithmilestone"
      );
      if (response?.data?.success) {
        setIsprojectmilestonedata(response.data.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      ProjectId: "",
      MilestoneId: "",
      Task_Name: "",
      StartDate: "",
      EndDate: "",
      Estimated_Time: "",
      Priority: "",
      Task_Description: "",
      Attachment: null,
      Resource_Id: "",
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("ProjectId", values.ProjectId);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);

      try {
        dispatch(setLoader(true));
        const response = await apiInstance.post(
          "/v2/manager/create-manager-task",
          formData
        );
        if (response?.data?.success) {
          setIsOpen(false);
          dispatch(setLoader(false));
          toast.success(response?.data?.message);
          formik.resetForm();
          fetchTasks();
        } else {
          dispatch(setLoader(false));
          setIsOpen(false);
          toast.error(response?.data?.message);
          formik.resetForm();
        }
      } catch (error) {
        setIsOpen(false);
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const fetchTasks = async () => {
    try {
      const response = await apiInstance.get("/v2/manager/fetch-manager-task", {
        params: {search, page: page + 1, limit},
      });
      setTasks(response.data.result);
      setTotalPages(response.data.pagination.totalPages);
      setTotalRecords(response.data.pagination.totalRecords);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmanagertaskmilestonesfunc();
    fetchTasks();
  }, [page, limit, search]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName=" Manager Task" />

      <Button
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        Create Task
      </Button>

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

      {IsOpen && (
        <TModal open={IsOpen} title="Add Task" onClose={() => setIsOpen(false)}>
          <Container maxWidth="md" sx={{mt: 2}}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{md: 6, sm: 12}}>
                  <InputSelect
                    {...formik.getFieldProps("ProjectId")}
                    labelText="Select Project"
                    value={formik.values.ProjectId}
                    placeholder="---Please select Project ---"
                    onChange={formik.handleChange}
                    options={Isprojectmilestonedata.map((item) => ({
                      label: item.Project_Name,
                      value: item.ProjectId,
                    }))}
                  />
                  {formik.touched.ProjectId && formik.errors.ProjectId && (
                    <div style={{font: "14px", color: "red"}}>
                      {formik.errors.ProjectId}
                    </div>
                  )}
                </Grid>

                <Grid size={{md: 6, sm: 12}}>
                  <InputSelect
                    {...formik.getFieldProps("MilestoneId")}
                    value={formik.values.MilestoneId}
                    labelText="Select Milestone"
                    placeholder="---Please select milestone ---"
                    options={Isprojectmilestonedata.filter(
                      (item) => item.ProjectId === formik.values.ProjectId
                    ).map((item) => {
                      return item.mileStonedata?.map((milestoneItem) => ({
                        label: milestoneItem?.milestoneName,
                        value: milestoneItem?.milestoneId,
                      }));
                    })}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.MilestoneId && formik.errors.MilestoneId && (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.MilestoneId}
                    </div>
                  )}
                </Grid>

                <Grid size={{md: 6, sm: 12}}>
                  <InputSelect
                    {...formik.getFieldProps("Resource_Id")}
                    labelText="Select Resource"
                    value={formik.values.Resource_Id}
                    onChange={formik.handleChange}
                    placeholder="--- please select Resource ---"
                    options={Isprojectmilestonedata.filter(
                      (item) => item.ProjectId === formik.values.ProjectId
                    ).map((item) => {
                      return item.resourcedata?.map((resourcedata) => ({
                        label: resourcedata.resourceName,
                        value: resourcedata.resourceId,
                      }));
                    })}
                  />
                </Grid>
                <Grid size={{md: 6, sm: 12}}>
                  <Input
                    labelText="Task Name"
                    name="Task_Name"
                    placeholder={"Please  enter Task Name"}
                    value={formik.values.Task_Name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Task_Name && formik.errors.Task_Name && (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.Task_Name}
                    </div>
                  )}
                </Grid>

                <Grid size={{md: 6, sm: 12}}>
                  <Input
                    labelText="Start Date"
                    name="StartDate"
                    type="date"
                    value={formik.values.StartDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.StartDate && formik.errors.StartDate && (
                    <div style={{color: "red", font: "14px"}}>
                      {formik?.errors?.StartDate}
                    </div>
                  )}
                </Grid>

                <Grid size={{md: 6, sm: 12}}>
                  <Input
                    labelText="Expected End Date"
                    name="EndDate"
                    type="date"
                    value={formik.values.EndDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.EndDate && formik.errors.EndDate && (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.EndDate}
                    </div>
                  )}
                </Grid>
                <Grid size={{md: 6, sm: 12}}>
                  <Input
                    labelText="Estimate Time (Hours)"
                    name="Estimated_Time"
                    type="number"
                    value={formik.values.Estimated_Time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={"please Enter Estimated Time Hours"}
                  />
                  {formik.touched.Estimated_Time &&
                    formik.errors.Estimated_Time && (
                      <div style={{color: "red", font: "14px"}}>
                        {formik.errors.Estimated_Time}
                      </div>
                    )}
                </Grid>

                <Grid size={{md: 6, sm: 12}} sx={{mt: 1}}>
                  <InputSelect
                    labelText="Priority Mode"
                    placeholder="--- Please select Priority ---"
                    name="Priority"
                    value={formik.values.Priority}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={[
                      {value: "HIGH", label: "HIGH"},
                      {value: "MEDIUM", label: "MEDIUM"},
                      {value: "LOW", label: "LOW"},
                    ]}
                  />
                </Grid>

                <Grid size={{md: 12, sm: 12}}>
                  <TextArea
                    labelText="Task Description"
                    placeholder="Please Write Task Description"
                    name="Task_Description"
                    value={formik.values.Task_Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Task_Description &&
                    formik.errors.Task_Description && (
                      <div style={{color: "red", font: "14px"}}>
                        {formik.errors.Task_Description}
                      </div>
                    )}
                </Grid>

                <Grid size={{md: 12, sm: 12}}>
                  <InputFIleupload
                    type="file"
                    name="Attachment"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "Attachment",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                </Grid>

                <Grid size={{md: 12, sm: 12}}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      background: "#2c3e50",
                      padding: "8px 10px",
                      color: "white",
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Submit Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </TModal>
      )}

      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper} sx={{mt: 4, p: 2}}>
        <Typography variant="h5" gutterBottom>
          Manager Tasks
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  <b>Task Name</b>
                </TableCell>
                <TableCell>
                  <b>Priority</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>End Date</b>
                </TableCell>
                <TableCell>
                  <b>Task Description</b>
                </TableCell>
                <TableCell>
                  <b> Description</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task.tast_Id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>
                    {new Date(task.StartDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(task.EndDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.Task_description}</TableCell>
                  <TableCell>{task.Description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={limit}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setLimit(parseInt(event.target.value, 10));
          setPage(0);
        }}
      /> */}

      <Pagination />
    </LayoutDesign>
  );
};

export default Taskpage;
