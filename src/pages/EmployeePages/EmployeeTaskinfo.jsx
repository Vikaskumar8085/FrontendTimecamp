import React, {useEffect, useState} from "react";
import apiInstance from "../../ApiInstance/apiInstance";
import {useParams} from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Container,
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import moment from "moment";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Layout from "../../Layoutcomponents/Layout/Layout";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const validationSchema = Yup.object({
  project: Yup.string().required("Project is required"),
  hours: Yup.number()
    .required("Hours are required")
    .min(1, "Hours must be at least 1"),
  task_Description: Yup.string()
    .trim()
    .required("Task Description is required"),
});
const EmployeeTaskinfo = () => {
  const {id} = useParams();
  const [IsTaskview, setIsTaskView] = useState([]);
  const [projectdata, setprojectdata] = useState([]);
  console.log(projectdata, ">>>>>>>>>");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true), fetchtaskproject();
  };
  const handleClose = () => setOpen(false);

  const projectids = IsTaskview?.data?.ProjectId;

  const fetchtaskinfofunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-single-task/${id}`
      );
      if (response.data.success) {
        setIsTaskView(response?.data?.result);
        fetchtaskproject();
      }
    } catch (error) {
      console.log(error?.message);
    }
    fetchtaskproject();
  };

  const fetchtaskproject = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-project-information/${projectids}`
      );
      if (response?.data?.success) {
        setprojectdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchtaskinfofunc();
  }, [0]);

  const formik = useFormik({
    initialValues: {
      project: "",
      hours: "",
      task_Description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await apiInstance.put(
          `/v2/employee/update-task-progress/${id}`,
          values
        );
        if (response?.data?.success) {
          setOpen(false);
          fetchtaskinfofunc();
          formik.resetForm();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Task Information" />
      <Card sx={{margin: "auto", mt: 4, boxShadow: 3, p: 2}}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            TaskName: {IsTaskview?.data?.Task_Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Status:
            {IsTaskview?.data?.Status === "INPROGRESS" ? (
              <Button
                style={{backgroundColor: "#2c3e50"}}
                variant="contained"
                onClick={handleOpen}
              >
                Fill Status
              </Button>
            ) : (
              <span
                style={{
                  background: "green",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  fontSize: "0.8em",
                  fontWeight: "800px",
                  margin: "0px 10px",
                }}
              >
                {IsTaskview?.data?.Status || "No Status"}
              </span>
            )}
            | Priority: {IsTaskview?.data?.Priority}
          </Typography>
          <Divider sx={{my: 2}} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Project:</strong> {IsTaskview.ProjectName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Milestone:</strong> {IsTaskview.MilestoneName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {moment(IsTaskview?.data?.StartDate).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {moment(IsTaskview?.data?.EndDate).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{my: 2}} />

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Description:</strong>{" "}
              {IsTaskview?.data?.Task_description || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Estimated Time:</strong>{" "}
              {IsTaskview?.data?.Estimated_Time || "N/A"} hours
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            {/* Project Select */}
            <FormControl
              fullWidth
              sx={{mb: 2}}
              error={formik.touched.project && Boolean(formik.errors.project)}
            >
              <InputLabel>Select Project</InputLabel>
              <Select {...formik.getFieldProps("project")}>
                {projectdata.map((item) => (
                  <MenuItem key={item.ProjectId} value={item.ProjectId}>
                    {item.Project_Name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.project && formik.errors.project && (
                <div style={{color: "red", fontSize: "12px"}}>
                  {formik.errors.project}
                </div>
              )}
            </FormControl>

            {/* Hours Input */}
            <TextField
              fullWidth
              label="Hours"
              type="number"
              {...formik.getFieldProps("hours")}
              error={formik.touched.hours && Boolean(formik.errors.hours)}
              helperText={formik.touched.hours && formik.errors.hours}
              margin="normal"
            />

            {/* Date Input */}
            <TextField
              fullWidth
              label="Task Description"
              type="text"
              multiline // ✅ Allows multi-line text input
              minRows={3} // ✅ Ensures good UX for descriptions
              InputLabelProps={{shrink: true}}
              {...formik.getFieldProps("task_Description")}
              error={
                formik.touched.task_Description &&
                Boolean(formik.errors.task_Description)
              }
              helperText={
                formik.touched.task_Description &&
                formik.errors.task_Description
              }
              margin="normal"
            />

            {/* Submit Button */}
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
        </Box>
      </Modal>
    </LayoutDesign>
  );
};

export default EmployeeTaskinfo;
