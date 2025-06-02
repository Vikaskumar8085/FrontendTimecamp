import React, { useEffect, useState } from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TextArea from "../../../common/TextArea/TextArea";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
  Grid2,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchemployeeactiveprojectapicall,
  fetchemployeeprojecttimesheetapicall,
  fillemployeetimesheetapicall,
} from "../../../ApiServices/EmployeeApiservices/Employee";
import { setLoader } from "../../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../../ApiInstance/apiInstance";
import { useDispatch } from "react-redux";
import TModal from "../../../common/Modal/TModal";
import InputSelect from "../../../common/InputSelect/InputSelect";
import Input from "../../../common/Input/Input";
import StatCard from "../../../common/StatCard/StatCard";
import InputSearch from "../../../common/InputSearch/InputSearch";
import Pagination from "../../../common/Pagination/Pagination";

const EmployeeProjectTimesheet = ({ id }) => {
  const [IsEmployeeProjectTimesheetdata, setIsEmployeeProjectTimesheetdata] =
    useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const [Isemployeeprojects, setIsemployeeprojects] = useState([]);

  const [IsOpen, setIsOpen] = useState(false);

  // heandlecheckBox
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };
  // handlechcekbox

  const fetchemployeeactiveproject = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-single-project/${id}`
      );
      console.log(response, "response");
      if (response?.data.success) {
        setIsemployeeprojects(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchEmployeeProjectTimesheet = async () => {
    try {
      const response = await fetchemployeeprojecttimesheetapicall(id);
      if (response.success) {
        setIsEmployeeProjectTimesheetdata(response?.result || []);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Staff_Id: id,
      hours: "",
      project: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    },
    validationSchema: Yup.object({
      hours: Yup.string().required("Hours are required"),
      project: Yup.string(),
      day: Yup.string().required("Day is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task description is required"),
      attachement: Yup.mixed().required("Attachment is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, "dalksdflk");
      const formdata = new FormData();
      formdata.append("hours", values.hours);
      formdata.append("project", values.project);
      formdata.append("day", values.day);
      formdata.append("Description", values.Description);
      formdata.append("task_description", values.task_description);
      formdata.append("file", values.attachement);
      try {
        const response = await fillemployeetimesheetapicall(formdata);
        if (response.success) {
          setIsOpen(false);
          formik.resetForm();
          fetchEmployeeProjectTimesheet();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  // remove timesheet

  const RemoveTimesheetFunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.delete(
        `/v2/employee/remove-employee-timesheet/${value}`
      );
      if (response.data?.success) {
        dispatch(setLoader(false));
        fetchEmployeeProjectTimesheet();
      } else {
      }
    } catch (error) {}
  };

  const SendForApprovel = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/employee/send-for-approvel/${id}`,
        selectedItems
      );
      fetchEmployeeProjectTimesheet();
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response.data?.message);
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEmployeeProjectTimesheet();
    fetchemployeeactiveproject();
  }, [0]);
  return (
    <>
      <BreadCrumb pageName="Employee Project Timesheet" />
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 3, lg: 3, sm: 6, xs: 12 }}>
          <StatCard />
        </Grid2>
        <Grid2 size={{ md: 3, lg: 3, sm: 6, xs: 12 }}>
          <StatCard />
        </Grid2>
        <Grid2 size={{ md: 3, lg: 3, sm: 6, xs: 12 }}>
          <StatCard />
        </Grid2>
        <Grid2 size={{ md: 3, lg: 3, sm: 6, xs: 12 }}>
          <StatCard />
        </Grid2>
      </Grid2>

      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Fill Timesheet
      </Button>

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

      {selectedItems.length > 0 ? (
        <Button
          onClick={() => SendForApprovel()}
          sx={{
            background: "#31bb62",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Send For Approved
        </Button>
      ) : null}

      {IsOpen && (
        <TModal
          open={IsOpen}
          title="Fill Timesheet"
          onClose={() => setIsOpen(false)}
        >
          <Container maxWidth="lg" sx={{ p: 2 }}>
            <Grid2 container spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <InputSelect
                    name={"project"}
                    labelText={"Select Project"}
                    {...formik.getFieldProps("project")}
                    value={formik.values.project}
                    options={Isemployeeprojects?.map((item) => ({
                      label: item?.Project_Name,
                      value: item?.ProjectId,
                    }))}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.project && formik.errors.project && (
                    <div style={{ color: "red" }}>{formik.errors.project}</div>
                  )}
                </Grid2>

                {/* <FormControl fullWidth sx={{mb: 2}}>
                  <InputLabel>Select Project</InputLabel>
                  <Select>
                    {[
                      ...(Isemployeeprojects?.response || []),
                      ...(Isemployeeprojects?.employeeactiveProjects || []),
                    ].map((item) => (
                      <MenuItem key={item.ProjectId} value={item.ProjectId}>
                        {item.Project_Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <Input
                    labelText="Hours"
                    name="hours"
                    value={formik.values.hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.hours && formik.errors.hours && (
                    <div style={{ color: "red", font: "14px" }}>
                      {" "}
                      {formik.errors.hours}
                    </div>
                  )}
                </Grid2>
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <Input
                    labeltext="Day"
                    name="day"
                    type="date"
                    value={formik.values.day}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.day && formik.errors.day && (
                    <div style={{ color: "red" }}>{formik.errors.day}</div>
                  )}
                </Grid2>

                <Grid2 size={{ md: 12, sm: 12 }}>
                  <TextArea
                    labelText="Description"
                    name="Description"
                    placeholder={"Please enter description"}
                    value={formik.values.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.Description && formik.errors.Description && (
                    <div style={{ color: "red", font: "14px" }}>
                      {formik.errors.Description}
                    </div>
                  )}
                </Grid2>

                <Grid2 size={{ md: 12, sm: 12 }}>
                  <TextArea
                    labelText="Task Description"
                    name="task_description"
                    value={formik.values.task_description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.task_description &&
                    formik.errors.task_description && (
                      <div style={{ color: "red", font: "14px" }}>
                        {formik.errors.task_description}
                      </div>
                    )}
                </Grid2>
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <InputFileupload
                    type="file"
                    name="attachement"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "attachement",
                        event.currentTarget.files[0]
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.attachement && formik.errors.attachement && (
                    <div style={{ color: "red" }}>
                      {formik.errors.attachement}
                    </div>
                  )}
                </Grid2>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Grid2>
          </Container>
        </TModal>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Typography variant="h6" sx={{ m: 2 }}>
          Employee Timesheet
        </Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Select id</TableCell>

              <TableCell>Timesheet Code</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Billing Status</TableCell>
              <TableCell>Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsEmployeeProjectTimesheetdata?.map((rowdata) => (
              <TableRow key={rowdata._id}>
                <TableCell>
                  <FormControlLabel
                    key={rowdata.Timesheet_Id}
                    control={
                      <Checkbox
                        checked={selectedItems.includes(rowdata.Timesheet_Id)}
                        onChange={() =>
                          handleCheckboxChange(rowdata.Timesheet_Id)
                        }
                      />
                    }
                    label={rowdata.name}
                  />
                </TableCell>
                <TableCell>{rowdata.ts_code}</TableCell>
                <TableCell>{rowdata.hours}</TableCell>
                <TableCell>{rowdata.Description}</TableCell>
                <TableCell>{rowdata.task_description}</TableCell>
                <TableCell>{rowdata.remarks}</TableCell>
                <TableCell>{rowdata.approval_status}</TableCell>
                <TableCell>{rowdata.billing_status}</TableCell>
                <TableCell>{rowdata.day}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => RemoveTimesheetFunc(rowdata?.Timesheet_Id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination />
    </>
  );
};

export default EmployeeProjectTimesheet;
