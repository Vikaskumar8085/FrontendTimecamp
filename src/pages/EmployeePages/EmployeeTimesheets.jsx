import React, {useCallback, useEffect, useState} from "react";
import {
  fetchemployeeprojectsapicall,
  fetchemployeetimesheetapicall,
  fillmultiemployeetimesheetapicall,
} from "../../ApiServices/EmployeeApiservices/Employee";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import moment from "moment";
import {FieldArray, FormikProvider, useFormik} from "formik";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Grid,
  Typography,
  Card,
  Button,
  Drawer,
  Container,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

import Empty from "../../common/EmptyFolder/Empty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import * as Yup from "yup";
import ListIcon from "@mui/icons-material/List";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";
import toast from "react-hot-toast";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../ApiInstance/apiInstance";
import {useDispatch} from "react-redux";

const isprojectinfodata = [
  {ProjectId: "P001", Project_Name: "Project One"},
  {ProjectId: "P002", Project_Name: "Project Two"},
];

const validationSchema = Yup.object().shape({
  entries: Yup.array().of(
    Yup.object().shape({
      Staff_Id: Yup.string().required("Staff Id is required"),
      project: Yup.string().required("Project is required"),
      hours: Yup.number()
        .typeError("Must be a number")
        .required("Hours are required"),
      day: Yup.date().required("Date is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task Description is required"),
      attachement: Yup.mixed(),
    })
  ),
});

const EmployeeTimesheets = () => {
  const [IsEmployeeTimesheetData, setIsEmployeeTimesheetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [IsEmployeeProjectdata, setIsEmployeeProjectdata] = useState([]);
  const [IsOpenfirst, setIsOpenfirst] = useState(false);
  const dispatch = useDispatch();
  const [IsOpen, setIsOpen] = useState(false);

  //
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);
  //
  const stats = [
    {
      label: "Total Hours",
      value: IsEmployeeTimesheetData.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: IsEmployeeTimesheetData.length,
      icon: <ListIcon color="secondary" />,
    },
  ];
  const fetchemployeetimesheetfunc = async () => {
    try {
      const response = await fetchemployeetimesheetapicall({
        params: {page: page + 1, limit: rowsPerPage, search},
      });
      if (response.success) {
        setIsEmployeeTimesheetData(response.result);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (timesheetId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(timesheetId)) {
        return prevSelected.filter((id) => id !== timesheetId);
      }
      return [...prevSelected, timesheetId];
    });
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allIds = IsEmployeeTimesheetData.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected =
    IsEmployeeTimesheetData?.length > 0 &&
    selectedItems.length === IsEmployeeTimesheetData.length;

  //  Fill Timesheet
  const formik = useFormik({
    initialValues: {
      entries: [
        {
          project: "",
          hours: "",
          day: "",
          Description: "",
          task_description: "",
          attachement: null,
        },
      ],
    },
    // validationSchema: Yup.object({
    //   entries: Yup.array().of(
    //     Yup.object({
    //       project: Yup.string().required("Project is required"),
    //       hours: Yup.number()
    //         .typeError("Must be a number")
    //         .min(0.5)
    //         .max(24)
    //         .required("Hours are required"),
    //       day: Yup.string().required("Day is required"),
    //       Description: Yup.string().required("Description is required"),
    //       task_description: Yup.string().required(
    //         "Task description is required"
    //       ),
    //       attachement: Yup.mixed().nullable(),
    //     })
    //   ),
    // }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        values.entries.forEach((entry, index) => {
          formData.append(`entries[${index}][project]`, entry.project);
          formData.append(`entries[${index}][hours]`, entry.hours);
          formData.append(`entries[${index}][day]`, entry.day);
          formData.append(`entries[${index}][Description]`, entry.Description);
          formData.append(
            `entries[${index}][task_description]`,
            entry.task_description
          );
          if (entry.attachement) {
            formData.append(
              `entries[${index}][attachement]`,
              entry.attachement
            );
          }
        });

        const response = await fillmultiemployeetimesheetapicall(formData);
        if (response?.success) {
          fetchemployeetimesheetfunc();
          setIsOpen(false);
        } else {
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });
  //  Fill Timesheetconst isprojectinfodata = [

  const fetchemployeeprojectsfunc = useCallback(async () => {
    try {
      const response = await fetchemployeeprojectsapicall();
      if (response?.success) {
        setIsEmployeeProjectdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  useEffect(() => {
    fetchemployeetimesheetfunc();
    fetchemployeeprojectsfunc();
  }, [0]);

  const approvetimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const val = {approvids: selectedItems};
      const response = await apiInstance.post(
        "/v2/employee/approve-timesheet-by-employee",
        val
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(error?.response?.data?.message);
    }
  };

  const disapprovetimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const val = {approvids: selectedItems};
      const response = await apiInstance.post(
        "/v2/employee/disapprove-timesheet-by-employee",
        val
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const billedTimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const val = {approvids: selectedItems};
      const response = await apiInstance.post(
        "/v2/employee/billed-timesheet-by-employee",
        val
      );
      if (response?.data?.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee Timesheet" />
      {/* modal */}
      <Button
        sx={{background: "skyblue", margin: "5px 0px", padding: "10px "}}
        onClick={() => setIsOpen(true)}
      >
        Fill TimeSheet
      </Button>

      {IsOpen && (
        <>
          <TModal
            open={IsOpen}
            onClose={() => setIsOpen(false)}
            title={"fill Timesheet"}
          >
            <Container maxWidth="sm" sx={{p: 2}}>
              <form onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                  <FieldArray
                    name="entries"
                    render={(arrayHelpers) => (
                      <>
                        {formik.values.entries.map((entry, index) => (
                          <div
                            key={index}
                            style={{
                              border: "1px solid #ccc",
                              marginBottom: 10,
                              padding: 10,
                            }}
                          >
                            <FormControl fullWidth sx={{mb: 2}}>
                              <InputLabel>Select Project</InputLabel>
                              <Select
                                name={`entries[${index}].project`}
                                value={entry.project}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.entries?.[index]?.project &&
                                  Boolean(
                                    formik.errors.entries?.[index]?.project
                                  )
                                }
                              >
                                {IsEmployeeProjectdata?.managedProjects.map(
                                  (item) => (
                                    <MenuItem
                                      key={item.ProjectId}
                                      value={item.ProjectId}
                                    >
                                      {item.Project_Name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                            <br />
                            <TextField
                              fullWidth
                              margin="normal"
                              name={`entries[${index}].hours`}
                              placeholder="Hours"
                              value={entry.hours}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <TextField
                              fullWidth
                              margin="normal"
                              name={`entries[${index}].day`}
                              placeholder="Day"
                              type="date"
                              value={entry.day}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <TextField
                              fullWidth
                              margin="normal"
                              name={`entries[${index}].Description`}
                              placeholder="Description"
                              value={entry.Description}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <TextField
                              fullWidth
                              margin="normal"
                              name={`entries[${index}].task_description`}
                              placeholder="Task Description"
                              value={entry.task_description}
                              onChange={formik.handleChange}
                            />
                            <br />
                            <TextField
                              fullWidth
                              margin="normal"
                              type="file"
                              name={`entries[${index}].attachement`}
                              onChange={(event) =>
                                formik.setFieldValue(
                                  `entries[${index}].attachement`,
                                  event.currentTarget.files[0]
                                )
                              }
                            />
                            <br />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove Entry
                            </button>
                            <hr />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              project: "",
                              hours: "",
                              day: "",
                              Description: "",
                              task_description: "",
                              attachement: null,
                            })
                          }
                        >
                          Add Entry
                        </button>
                      </>
                    )}
                  />
                </FormikProvider>
                <br />
                <button type="submit">Submit</button>
              </form>
            </Container>
          </TModal>
        </>
      )}

      {/* modal */}
      {selectedItems.length > 0 ? (
        <>
          <Button onClick={() => approvetimesheetfunc()}>Approve</Button>
          <Button onClick={() => disapprovetimesheetfunc()}>dis Approve</Button>
          <Button onClick={() => billedTimesheetfunc()}>Billed</Button>
        </>
      ) : null}

      {/* timesheet data */}
      {/* <Grid container spacing={2} sx={{ my: 1 }}>
        {stats.map((stat, index) => (
          <Grid item sm={12} md={3} lg={3} key={index}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {stat.icon}
              <Typography variant="h6">
                {stat.label}: {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      {/* timesheet data */}

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAllChange}
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < IsEmployeeTimesheetData?.length
                      }
                    />
                  }
                  label="sr.No"
                />
                ;
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Timesheet No.</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Billed Hours</TableCell>
              <TableCell>Ok Hours</TableCell>
              <TableCell>Blank Hours</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Billing Status</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Attachement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsEmployeeTimesheetData.length > 0 ? (
              IsEmployeeTimesheetData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControlLabel
                      key={item.Timesheet_Id}
                      control={
                        <Checkbox
                          checked={selectedItems.includes(item.Timesheet_Id)}
                          onChange={() => {
                            handleCheckboxChange(item.Timesheet_Id);
                            setProjectid(item.project);
                          }}
                        />
                      }
                      label={item.name}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.ts_code}</TableCell>
                  <TableCell>
                    {moment(item.created_at).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{item.ProjectName || null}</TableCell>
                  <TableCell>{item.StaffName || null}</TableCell>
                  <TableCell>{item.Description || null}</TableCell>
                  <TableCell>{item.hours || null}</TableCell>
                  <TableCell>{item.billed_hours || null}</TableCell>
                  <TableCell>{item.ok_hours || null}</TableCell>
                  <TableCell>{item.blank_hours}</TableCell>
                  <TableCell>{item.approval_status}</TableCell>
                  <TableCell>{item.billing_status}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={30} align="center">
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default EmployeeTimesheets;
