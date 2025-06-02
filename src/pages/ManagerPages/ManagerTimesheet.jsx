import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import * as Yup from "yup";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Button,
  Container,
  Grid2,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";
import {useFormik} from "formik";
import Input from "../../common/Input/Input";
import toast from "react-hot-toast";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
const ManagerTimesheet = () => {
  const [isOpenTimesheet, setIsOpenTimesheet] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  // select
  const [isProjectid, setProjectid] = useState(null);

  console.log(selectedItems, "selectedItems");

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
      const allIds = timesheets.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected =
    timesheets?.length > 0 && selectedItems.length === timesheets.length;
  // select

  const stats = [
    {
      label: "Total Hours",
      value: timesheets.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: timesheets.length,
      icon: <ListIcon color="secondary" />,
    },
    {
      label: "Total Billed Hours",
      value: timesheets.reduce(
        (sum, item) => sum + (item.billed_hours || 0),
        0
      ),
      icon: <ReceiptIcon color="success" />,
    },
    {
      label: "Total OK Hours",
      value: timesheets.reduce((sum, item) => sum + (item.ok_hours || 0), 0),
      icon: <CheckCircleIcon color="primary" />,
    },
  ];

  let id = 1;

  const isprojectinfodata = [
    {ProjectId: "P001", Project_Name: "Project One"},
    {ProjectId: "P002", Project_Name: "Project Two"},
  ];

  const formik = useFormik({
    initialValues: {
      filltimesheets: [
        {
          Staff_Id: id,
          project: "",
          hours: "",
          day: "",
          Description: "",
          task_description: "",
          attachement: null,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      filltimesheets: Yup.array().of(
        Yup.object().shape({
          Staff_Id: Yup.string().required(),
          project: Yup.string().required("Project is required"),
          hours: Yup.number()
            .typeError("Must be a number")
            .required("Hours are required"),
          day: Yup.date().required("Date is required"),
          Description: Yup.string().required("Description is required"),
          task_description: Yup.string().required(
            "Task Description is required"
          ),
          attachement: Yup.mixed(),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log(values, "values");
    },
  });

  useEffect(() => {
    const fetchTimesheets = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get(
          `/v2/manager/timesheet?page=${page}&limit=${limit}`
        );
        setTimesheets(response.data.result);
        setTotalPages(Math.ceil(response.data.total / limit));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, [page, limit]);

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

  const sendForapprovelfunc = async () => {
    try {
      dispatch(setLoader(true));
      const val = {approveIds: selectedItems};
      const response = await apiInstance.post(
        "/v2/manager/send-for-approvel",
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
      <BreadCrumb pageName="Manager Timesheet" />

      <Button
        onClick={() => {
          setIsOpenTimesheet(true);
        }}
      >
        Fill Timesheet
      </Button>
      {isOpenTimesheet && (
        <TModal
          title={"FIll Timesheet "}
          open={isOpenTimesheet}
          onClose={() => setIsOpenTimesheet(false)}
        >
          <Container maxWidth="lg">
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container spacing={2}>
                {formik.values.filltimesheets.map((item, index) => (
                  <Grid2 key={index} xs={12}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Grid2 container spacing={2}>
                        <Grid2 xs={12}>
                          <TextField
                            fullWidth
                            label="Staff ID"
                            name={`filltimesheets[${index}].Staff_Id`}
                            value={item.Staff_Id}
                            disabled
                          />
                        </Grid2>

                        <Grid2 xs={12}>
                          <FormControl fullWidth>
                            <InputLabel>Select Project</InputLabel>
                            <Select
                              name={`filltimesheets[${index}].project`}
                              value={item.project}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.filltimesheets?.[index]
                                  ?.project &&
                                Boolean(
                                  formik.errors.filltimesheets?.[index]?.project
                                )
                              }
                            >
                              {isprojectinfodata.map((item) => (
                                <MenuItem
                                  key={item.ProjectId}
                                  value={item.ProjectId}
                                >
                                  {item.Project_Name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {formik.touched.filltimesheets?.[index]?.project &&
                            formik.errors.filltimesheets?.[index]?.project && (
                              <div style={{color: "red", fontSize: "14px"}}>
                                {formik.errors.filltimesheets[index].project}
                              </div>
                            )}
                        </Grid2>

                        <Grid2 xs={6}>
                          <TextField
                            fullWidth
                            label="Hours"
                            name={`filltimesheets[${index}].hours`}
                            value={item.hours}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.filltimesheets?.[index]?.hours &&
                              Boolean(
                                formik.errors.filltimesheets?.[index]?.hours
                              )
                            }
                            helperText={
                              formik.touched.filltimesheets?.[index]?.hours &&
                              formik.errors.filltimesheets?.[index]?.hours
                            }
                          />
                        </Grid2>

                        <Grid2 xs={6}>
                          <TextField
                            fullWidth
                            label="Day"
                            type="date"
                            InputLabelProps={{shrink: true}}
                            name={`filltimesheets[${index}].day`}
                            value={item.day}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.filltimesheets?.[index]?.day &&
                              Boolean(
                                formik.errors.filltimesheets?.[index]?.day
                              )
                            }
                            helperText={
                              formik.touched.filltimesheets?.[index]?.day &&
                              formik.errors.filltimesheets?.[index]?.day
                            }
                          />
                        </Grid2>

                        <Grid2 xs={12}>
                          <TextField
                            fullWidth
                            label="Description"
                            name={`filltimesheets[${index}].Description`}
                            value={item.Description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.filltimesheets?.[index]
                                ?.Description &&
                              Boolean(
                                formik.errors.filltimesheets?.[index]
                                  ?.Description
                              )
                            }
                            helperText={
                              formik.touched.filltimesheets?.[index]
                                ?.Description &&
                              formik.errors.filltimesheets?.[index]?.Description
                            }
                          />
                        </Grid2>

                        <Grid2 xs={12}>
                          <TextField
                            fullWidth
                            label="Task Description"
                            name={`filltimesheets[${index}].task_description`}
                            value={item.task_description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.filltimesheets?.[index]
                                ?.task_description &&
                              Boolean(
                                formik.errors.filltimesheets?.[index]
                                  ?.task_description
                              )
                            }
                            helperText={
                              formik.touched.filltimesheets?.[index]
                                ?.task_description &&
                              formik.errors.filltimesheets?.[index]
                                ?.task_description
                            }
                          />
                        </Grid2>

                        <Grid2 xs={12}>
                          <input
                            type="file"
                            name={`filltimesheets[${index}].attachement`}
                            onChange={(event) =>
                              formik.setFieldValue(
                                `filltimesheets[${index}].attachement`,
                                event.currentTarget.files[0]
                              )
                            }
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.filltimesheets?.[index]
                            ?.attachement &&
                            formik.errors.filltimesheets?.[index]
                              ?.attachement && (
                              <div style={{color: "red"}}>
                                {
                                  formik.errors.filltimesheets[index]
                                    .attachement
                                }
                              </div>
                            )}
                        </Grid2>

                        <Grid2 xs={12}>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => {
                              const updated = [...formik.values.filltimesheets];
                              updated.splice(index, 1);
                              formik.setFieldValue("filltimesheets", updated);
                            }}
                            disabled={formik.values.filltimesheets.length === 1}
                          >
                            Remove
                          </Button>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  formik.setFieldValue("filltimesheets", [
                    ...formik.values.filltimesheets,
                    {
                      Staff_Id: id,
                      project: "",
                      hours: "",
                      day: "",
                      Description: "",
                      task_description: "",
                      attachement: null,
                    },
                  ])
                }
                sx={{mt: 2}}
              >
                Add Entry
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{mt: 2}}
              >
                Submit
              </Button>
            </form>
          </Container>
        </TModal>
      )}
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

      {selectedItems.length > 0 ? (
        <Button
          sx={{
            color: "white",
            backgroundColor: "#6560f0",
            padding: "10px 10px",
            margin: "0px 10px",
          }}
          onClick={() => sendForapprovelfunc()}
        >
          send For Approvel
        </Button>
      ) : null}
      <Paper sx={{padding: 2, margin: "auto"}}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAllSelected}
                          onChange={handleSelectAllChange}
                          indeterminate={
                            selectedItems.length > 0 &&
                            selectedItems.length < timesheets?.length
                          }
                        />
                      }
                      label="sr.No"
                    />
                  </TableCell>
                  <TableCell> ID</TableCell>
                  <TableCell>TS code</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Ok Hours</TableCell>
                  <TableCell>Blank Hours</TableCell>
                  <TableCell>Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timesheets.map((timesheet, index) => (
                  <TableRow key={timesheet._id}>
                    <TableCell>
                      <FormControlLabel
                        key={timesheet.Timesheet_Id}
                        control={
                          <Checkbox
                            checked={selectedItems.includes(
                              timesheet.Timesheet_Id
                            )}
                            onChange={() => {
                              handleCheckboxChange(timesheet.Timesheet_Id);
                              setProjectid(timesheet.project);
                            }}
                          />
                        }
                        label={timesheet.name}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{timesheet.ts_code}</TableCell>
                    <TableCell>{timesheet?.projectName}</TableCell>
                    <TableCell>{timesheet.approval_status}</TableCell>
                    <TableCell>{timesheet?.hours}</TableCell>
                    <TableCell>{timesheet.ok_hours}</TableCell>
                    <TableCell>{timesheet.blank_hours}</TableCell>
                    <TableCell>{timesheet.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{marginTop: 2, display: "flex", justifyContent: "center"}}
        />
      </Paper>
    </LayoutDesign>
  );
};

export default ManagerTimesheet;
