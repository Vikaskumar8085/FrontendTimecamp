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
  Grid2,
  Typography,
  Card,
  Button,
  Container,
  TextField,
  TablePagination,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Input from "../../common/Input/Input";
import InputSelect from "../../common/InputSelect/InputSelect";
import InputFileupload from "../../common/InputFileupload/InputFileupload";
import TextArea from "../../common/TextArea/TextArea";
import TModal from "../../common/Modal/TModal";
import Empty from "../../common/EmptyFolder/Empty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import * as Yup from "yup";
import ListIcon from "@mui/icons-material/List";
import apiInstance from "../../ApiInstance/apiInstance";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";

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

  const handleCheckboxChange = (timesheetId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(timesheetId)) {
        return prevSelected.filter((id) => id !== timesheetId);
      }
      return [...prevSelected, timesheetId];
    });
  };

  // fill-contractor-timesheet
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
      console.log("Submitted values:", values);

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
          "/v2/contractor/fill-contractor-timesheet",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response?.data?.success) {
          formik.resetForm();
          setIsOpenfirst(false);
          toast.success(response?.data?.message);
        } else {
          formik.resetForm();
          toast.error(response?.data?.message);
          setIsOpenfirst(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setIsOpenfirst(false);
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
          sx={{
            background: "#3d4e59",
            color: "white",
            margin: "5px 0px",
            padding: "10px ",
          }}
          onClick={() => setIsOpenfirst(true)}
        >
          Fill TimeSheet
        </Button>

        {IsOpenfirst && (
          <>
            <TModal
              open={IsOpenfirst}
              onClose={() => setIsOpenfirst(false)}
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
                            options={IsContractorProjectdata?.map((item) => ({
                              label: item.Project_Name,
                              value: item.ProjectId,
                            }))}
                            {...formik.getFieldProps(
                              `entries[${index}].project`
                            )}
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
                        sx={{
                          width: "100%",
                          background: "#3d4e59",
                          color:"white",
                          padding: "10px 0px",
                        }}
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

        {/* fill time sheet */}
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
