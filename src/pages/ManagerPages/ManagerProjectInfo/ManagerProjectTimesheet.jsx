import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import InputSearch from "../../../common/InputSearch/InputSearch";
import Pagination from "../../../common/Pagination/Pagination";
import TModal from "../../../common/Modal/TModal";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
import apiInstance from "../../../ApiInstance/apiInstance";
const ManagerProjectTimesheet = ({
  IsManagerProjectTimesheetdata,
  IsManagerprojectinfo,
  IsFillTimesheet,
  setIsFillTimesheet,
  handlefilltimesheet,
  reomvemanagertimesheetfunc,
  sendforapprovelmanagettimesheetfunc,
  approvebymanagertimesheetfunc,
  disapprovebymanagertimesheetfunc,
  selectedItems,
  setSelectedItems,
}) => {
  const dispatch = useDispatch();
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  const formik = useFormik({
    initialValues: {
      hours: "",
      project: "",
      day: "",
      Description: "",
      task_description: "",
      Attachment: null,
    },
    validationSchema: Yup.object({
      hours: Yup.string().required("Hours are required"),
      project: Yup.string().required("Project ID is required"),
      day: Yup.string().required("Day is required"),
      Description: Yup.string().required("Description is required"),
      task_description: Yup.string().required("Task description is required"),
      Attachment: Yup.mixed().required("Attachment  is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formdata = new FormData();
        formdata.append("hours", values.hours);
        formdata.append("project", values.project);
        formdata.append("day", values.day);
        formdata.append("Description", values.Description);
        formdata.append("task_description", values.task_description);
        formdata.append("file", values?.Attachment);
        handlefilltimesheet(formdata);
        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  return (
    <>
      <BreadCrumb pageName="Manager Timesheet" />

      {selectedItems.length > 0 ? (
        <Button
          onClick={() => sendforapprovelmanagettimesheetfunc()}
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

      <Button
        onClick={() => setIsFillTimesheet(true)}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Fill Timesheet
      </Button>

      {IsFillTimesheet && (
        <TModal
          title="Fill Timesheet"
          open={IsFillTimesheet}
          onClose={() => setIsFillTimesheet(false)}
        >
          <Container maxWidth="sm" sx={{p: 2}}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel>Select Project</InputLabel>
                <Select
                  {...formik.getFieldProps("project")}
                  value={formik.values.project}
                  onChange={formik.handleChange}
                >
                  {IsManagerprojectinfo.map((item) => {
                    return (
                      <MenuItem key={item.ProjectId} value={item.ProjectId}>
                        {item.Project_Name}
                      </MenuItem>
                    );
                  })}
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
                name="Attachment"
                onChange={(event) =>
                  formik.setFieldValue(
                    "Attachment",
                    event.currentTarget.files[0]
                  )
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.Attachment && formik.errors.Attachment && (
                <div style={{color: "red"}}>{formik.errors.Attachment}</div>
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
        </TModal>
      )}
      {selectedItems.length > 0 ? (
        <>
          <Button
            onClick={() => approvebymanagertimesheetfunc()}
            sx={{
              background: "green",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Approve
          </Button>
          <Button
            onClick={() => disapprovebymanagertimesheetfunc()}
            sx={{
              background: "#D97A5C",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Disapprove
          </Button>

          <Button
            sx={{
              background: "orange",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
            onClick={() => sendforapprovelmanagettimesheetfunc(selectedItems)}
          >
            Send For Approved
          </Button>
          <Button
            sx={{
              background: "red",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
            onClick={() => reomvemanagertimesheetfunc()}
          >
            delete selected
          </Button>
        </>
      ) : null}

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
      <Card>
        <CardHeader title="Project Timesheet " />
        <CardContent>
          {IsManagerProjectTimesheetdata?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SelectId</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>
                      <b>TS Code</b>
                    </TableCell>
                    <TableCell>
                      <b>Hours</b>
                    </TableCell>
                    <TableCell>
                      <b>Task Description</b>
                    </TableCell>
                    <TableCell>
                      <b>Description</b>
                    </TableCell>
                    <TableCell>
                      <b>Approval Status</b>
                    </TableCell>
                    <TableCell>
                      <b>Billing Status</b>
                    </TableCell>
                    <TableCell>
                      <b>Start Time</b>
                    </TableCell>
                    <TableCell>
                      <b>End Time</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {IsManagerProjectTimesheetdata?.map((entry, index) => {
                    return (
                      <TableRow key={entry._id}>
                        <TableCell>
                          <FormControlLabel
                            key={entry.Timesheet_Id}
                            control={
                              <Checkbox
                                checked={selectedItems.includes(
                                  entry.Timesheet_Id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(entry.Timesheet_Id)
                                }
                              />
                            }
                            label={entry.name}
                          />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{entry?.ts_code || "N/A"}</TableCell>
                        <TableCell>{entry?.hours || "N/A"}</TableCell>
                        <TableCell>
                          {entry?.task_description || "N/A"}
                        </TableCell>
                        <TableCell>{entry?.Description || "N/A"}</TableCell>
                        <TableCell>{entry.approval_status || "N/A"}</TableCell>
                        <TableCell>{entry?.billing_status || "N/A"}</TableCell>
                        <TableCell>{entry?.start_time || "N/A"}</TableCell>
                        <TableCell>{entry?.end_time || "N/A"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center">No timesheet data found.</Typography>
          )}
        </CardContent>
      </Card>
      <Pagination />
    </>
  );
};

export default ManagerProjectTimesheet;
