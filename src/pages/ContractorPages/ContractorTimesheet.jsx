import React, {useEffect, useState} from "react";
import {
  fetchContractorprojectsapicall,
  fetchcontractortimesheetapicall,
} from "../../ApiServices/ContractorApiServices/ContractorApiServices";

import moment from "moment";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {useFormik} from "formik";
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
} from "@mui/material";
import Empty from "../../common/EmptyFolder/Empty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import ListIcon from "@mui/icons-material/List";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import {useDispatch} from "react-redux";
import { setLoader } from "../../redux/LoaderSlices/LoaderSlices";

const ContractorTimesheet = () => {
  const [isContractorTimesheetdata, setIsContractorTimesheetdata] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  // total Records
  const [IsContractorProjectdata, setIsContractorProjectdata] = useState([]);
  const [IsOpenfirst, setIsOpenfirst] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);
  //fill timesheet
  //

  // fill timesheet

  const stats = [
    {
      label: "Total Hours",
      value: isContractorTimesheetdata.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: isContractorTimesheetdata.length,
      icon: <ListIcon color="secondary" />,
    },
  ];
  const fetchcontractorTimesheetfunc = async () => {
    try {
      const response = await fetchcontractortimesheetapicall({
        params: {page: page + 1, limit: rowsPerPage, search},
      });
      if (response.success) {
        setIsContractorTimesheetdata(response.result);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error?.message);
    }
    setLoading(false);
  };

  const fetchcontractorprojectfunc = async () => {
    try {
      const response = await fetchContractorprojectsapicall();
      if (response.success) {
        setIsContractorProjectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      hours: "",
      project: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    },
    validationSchema: Yup.object({
      hours: Yup.string().required("Hours are required"),
      project: Yup.string().required("Project ID is required"),
      day: Yup.string().required("Day is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task description is required"),
      attachement: Yup.mixed().required("Attachment is required"),
    }),
    onSubmit: async (values) => {
      const formdata = new FormData();

      formdata.append("hours", values.hours);
      formdata.append("project", values.project);
      formdata.append("day", values.day);
      formdata.append("Description", values.Description);
      formdata.append("task_description", values.task_description);
      formdata.append("file", values.attachement);
      console.log("Form Data:", formdata);

      try {
        const response = await apiInstance.post(
          "/v2/contractor/contractor-v1-fill-timesheet",
          formdata
        );
        if (response?.data?.success) {
          fetchcontractorTimesheetfunc();
          setIsOpenfirst(false);
          toast.success(response?.data?.message);
          formik.resetForm();
        } else {
          toast.error(response?.data?.message);
          fetchcontractorTimesheetfunc();
        }
        // formik.resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

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
      const allIds = isContractorTimesheetdata.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected =
    isContractorTimesheetdata?.length > 0 &&
    selectedItems.length === isContractorTimesheetdata.length;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    fetchcontractorTimesheetfunc();
  }, [page, rowsPerPage, search]);
  useEffect(() => {
    fetchcontractorprojectfunc();
  }, [0]);

  const approvetimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const val = {approvids: selectedItems};
      const response = await apiInstance.post(
        "/v2/contractor/approve-timesheet-by-contractor",
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
        "/v2/contractor/disapprove-timesheet-by-contractor",
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
        "/v2/contractor/billed-timesheet-by-contractor",
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
    <div>
      <LayoutDesign>
        <BreadCrumb pageName="Contractor Timesheet" />

        {/* timesheet */}
        <Grid container spacing={2} sx={{my: 1}}>
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
        </Grid>
        <TextField
          fullWidth
          label="Search Tasks..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{marginBottom: 20}}
        />

        {/* header tab of timesheet */}

        {selectedItems.length > 0 ? (
          <>
            <Button onClick={() => approvetimesheetfunc()}>Approve</Button>
            <Button onClick={() => disapprovetimesheetfunc()}>
              dis Approve
            </Button>
            <Button onClick={() => billedTimesheetfunc()}>Billed</Button>
          </>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsOpenfirst(true)}
          sx={{
            textTransform: "none",
            background: "#2c3e50",
            fontWeight: "bold",
            padding: "8px 10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        >
          Fill Timesheet
        </Button>

        {IsOpenfirst && (
          <Drawer
            open={IsOpenfirst}
            anchor="right"
            onClose={() => {
              setIsOpenfirst(false);
            }}
          >
            <Container maxWidth="sm" sx={{p: 2}}>
              <Typography
                sx={{
                  margin: "10px",
                  textTransform: "capitalize",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                }}
              >
                Fill Timesheet
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth sx={{mb: 2}}>
                  <InputLabel>Select Project</InputLabel>
                  <Select
                    {...formik.getFieldProps("project")}
                    value={formik.values.project}
                    onChange={formik.handleChange}
                  >
                    {[
                      ...(IsContractorProjectdata?.response || []),
                      ...(IsContractorProjectdata?.contractorProjects || []),
                    ].map((item) => (
                      <MenuItem key={item.ProjectId} value={item.ProjectId}>
                        {item.Project_Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Hours"
                  name="hours"
                  value={formik.values.hours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.hours && Boolean(formik.errors.hours)}
                  helperText={formik.touched.hours && formik.errors.hours}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Day"
                  name="day"
                  type="date"
                  InputLabelProps={{shrink: true}}
                  value={formik.values.day}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.day && Boolean(formik.errors.day)}
                  helperText={formik.touched.day && formik.errors.day}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="Description"
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Description &&
                    Boolean(formik.errors.Description)
                  }
                  helperText={
                    formik.touched.Description && formik.errors.Description
                  }
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Task Description"
                  name="task_description"
                  value={formik.values.task_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.task_description &&
                    Boolean(formik.errors.task_description)
                  }
                  helperText={
                    formik.touched.task_description &&
                    formik.errors.task_description
                  }
                  margin="normal"
                />

                <input
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
                  <div style={{color: "red"}}>{formik.errors.attachement}</div>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{marginTop: "15px"}}
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Container>
          </Drawer>
        )}

        {/* header tab of timesheet */}

        {/* timesheet */}
        {loading ? (
          <CircularProgress />
        ) : (
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
                            selectedItems.length <
                              isContractorTimesheetdata?.length
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
                {isContractorTimesheetdata.length > 0 ? (
                  isContractorTimesheetdata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControlLabel
                          key={item.Timesheet_Id}
                          control={
                            <Checkbox
                              checked={selectedItems.includes(
                                item.Timesheet_Id
                              )}
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
                        {moment(item.created_at).format("DD/MM/YYYY")}
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
                      <TableCell>
                        {item.attachement ? (
                          <a
                            href={`${item.attachement}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          <span>No Attachment</span>
                        )}
                      </TableCell>
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
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </LayoutDesign>
    </div>
  );
};

export default ContractorTimesheet;
