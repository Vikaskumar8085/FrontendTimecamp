import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import apiInstance from "../../../../ApiInstance/apiInstance";

const FillTimesheetForm = ({ handleSubmit }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project data
    const fetchProjects = async () => {
      try {
        const response = await apiInstance.get("/projects"); // Adjust endpoint as needed
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const formik = useFormik({
    initialValues: {
      timesheets: [
        {
          projectId: "",
          day: "",
          description: "",
          taskDescription: "",
          attachment: null,
        },
      ],
    },
    validationSchema: Yup.object({
      timesheets: Yup.array().of(
        Yup.object({
          projectId: Yup.string().required("Project is required"),
          day: Yup.date().required("Date is required"),
          description: Yup.string().required("Description is required"),
          taskDescription: Yup.string().required(
            "Task description is required"
          ),
          attachment: Yup.mixed().nullable(),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        handleSubmit(values);
        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  const handleAddTimesheet = () => {
    formik.setValues({
      ...formik.values,
      timesheets: [
        ...formik.values.timesheets,
        {
          projectId: "",
          day: "",
          description: "",
          taskDescription: "",
          attachment: null,
        },
      ],
    });
  };

  const handleRemoveTimesheet = (index) => {
    const updatedTimesheets = formik.values.timesheets.filter(
      (_, i) => i !== index
    );
    formik.setValues({ ...formik.values, timesheets: updatedTimesheets });
  };

  return (
    <Container maxWidth="md" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Fill Timesheet Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {formik.values.timesheets.map((timesheet, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Project"
                    name={`timesheets[${index}].projectId`}
                    value={timesheet.projectId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.timesheets?.[index]?.projectId &&
                      Boolean(formik.errors.timesheets?.[index]?.projectId)
                    }
                    helperText={
                      formik.touched.timesheets?.[index]?.projectId &&
                      formik.errors.timesheets?.[index]?.projectId
                    }
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Day"
                    InputLabelProps={{ shrink: true }}
                    name={`timesheets[${index}].day`}
                    value={timesheet.day}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.timesheets?.[index]?.day &&
                      Boolean(formik.errors.timesheets?.[index]?.day)
                    }
                    helperText={
                      formik.touched.timesheets?.[index]?.day &&
                      formik.errors.timesheets?.[index]?.day
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name={`timesheets[${index}].description`}
                    value={timesheet.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.timesheets?.[index]?.description &&
                      Boolean(formik.errors.timesheets?.[index]?.description)
                    }
                    helperText={
                      formik.touched.timesheets?.[index]?.description &&
                      formik.errors.timesheets?.[index]?.description
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task Description"
                    name={`timesheets[${index}].taskDescription`}
                    value={timesheet.taskDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.timesheets?.[index]?.taskDescription &&
                      Boolean(
                        formik.errors.timesheets?.[index]?.taskDescription
                      )
                    }
                    helperText={
                      formik.touched.timesheets?.[index]?.taskDescription &&
                      formik.errors.timesheets?.[index]?.taskDescription
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name={`timesheets[${index}].attachment`}
                    onChange={(event) => {
                      formik.setFieldValue(
                        `timesheets[${index}].attachment`,
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveTimesheet(index)}
                    disabled={formik.values.timesheets.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTimesheet}
              startIcon={<Add />}
            >
              Add Entry
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FillTimesheetForm;
