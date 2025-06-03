import React, {useCallback, useEffect, useState} from "react";
import InputSelect from "../../common/InputSelect/InputSelect";
import InputFileupload from "../../common/InputFileupload/InputFileupload";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import TextArea from "../../common/TextArea/TextArea";
import AddIcon from "@mui/icons-material/Add";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
  const fetchmanagertimesheetprojectsfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-active-project"
      );

      setmanagerProject(response?.data?.result);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

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

    fetchmanagertimesheetprojectsfunc();

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
  const [ismanagerproject, setmanagerProject] = useState([]);
  console.log(ismanagerproject, "ismanagerproject");

  // timesheet

  const [entries, setEntries] = useState([
    {
      project: "",
      hours: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      entries,
    },
    onSubmit: async (values) => {
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
          formData.append(`entries[${index}][attachement]`, entry.attachement);
        }
      });

      try {
        const response = await apiInstance.post(
          "/v2/manager/fill-multi-timesheet-by-manager",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response?.data?.success) {
          formik.resetForm();
          setIsOpenTimesheet(false);
          toast.success(response?.data?.message);
        } else {
          formik.resetForm();
          toast.error(response?.data?.message);
          setIsOpenTimesheet(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setIsOpenTimesheet(false);
        formik.resetForm();
      }
    },
  });

  const handleFileChange = (e, index) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue(`entries[${index}].attachement`, file);
  };

  // add Entry
  const addEntry = () => {
    const newEntry = {
      project: "",
      hours: "",
      day: "",
      Description: "",
      task_description: "",
      attachement: null,
    };
    setEntries([...entries, newEntry]);
    formik.setFieldValue("entries", [...formik.values.entries, newEntry]);
  };
  // Remove Entry
  const removeEntry = (indexToRemove) => {
    const updatedEntries = formik.values.entries.filter(
      (_, i) => i !== indexToRemove
    );
    setEntries(updatedEntries);
    formik.setFieldValue("entries", updatedEntries);
  };

  // timesheet

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Manager Timesheet" />

      {/* modal */}
      <Button
        sx={{background: "skyblue", margin: "5px 0px", padding: "10px "}}
        onClick={() => setIsOpenTimesheet(true)}
      >
        Fill TimeSheet
      </Button>

      {isOpenTimesheet && (
        <>
          <TModal
            open={isOpenTimesheet}
            onClose={() => setIsOpenTimesheet(false)}
            title={"fill Timesheet"}
          >
            <Container maxWidth="sm" sx={{p: 2}}>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={2}>
                  {formik.values.entries.map((entry, index) => (
                    <Grid2
                      container
                      spacing={2}
                      key={index}
                      sx={{
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <InputSelect
                          labelText="Select Project"
                          placeholder="Please select your projects"
                          options={ismanagerproject?.map((item) => ({
                            label: item.Project_Name,
                            value: item?.ProjectId,
                          }))}
                          {...formik.getFieldProps(`entries[${index}].project`)}
                        />
                      </Grid2>

                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <Input
                          type="number"
                          placeholder="Please Enter Project Hours"
                          labelText="Project Hours"
                          {...formik.getFieldProps(`entries[${index}].hours`)}
                        />
                      </Grid2>

                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <Input
                          type="date"
                          labelText="Date"
                          {...formik.getFieldProps(`entries[${index}].day`)}
                        />
                      </Grid2>

                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <TextArea
                          labelText="Description"
                          placeholder="Please Enter Project Description"
                          {...formik.getFieldProps(
                            `entries[${index}].Description`
                          )}
                        />
                      </Grid2>

                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <TextArea
                          labelText="Task Description"
                          placeholder="Please Enter Task Description"
                          {...formik.getFieldProps(
                            `entries[${index}].task_description`
                          )}
                        />
                      </Grid2>

                      <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                        <InputFileupload
                          type="file"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </Grid2>

                      {formik.values.entries.length > 1 && (
                        <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                          <Button
                            type="button"
                            startIcon={<DeleteIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={() => removeEntry(index)}
                          >
                            Remove Entry
                          </Button>
                        </Grid2>
                      )}
                    </Grid2>
                  ))}

                  <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                    <Button
                      startIcon={<AddIcon />}
                      color="success"
                      variant="outlined"
                      type="button"
                      onClick={addEntry}
                    >
                      Add Entry
                    </Button>
                  </Grid2>

                  <Grid2 size={{md: 12, lg: 12, xs: 12, sm: 12}}>
                    <Button
                      sx={{width: "100%", padding: "10px 0px"}}
                      color="success"
                      variant="outlined"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </Container>
          </TModal>
        </>
      )}

      {/* modal */}
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
