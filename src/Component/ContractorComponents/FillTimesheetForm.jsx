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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { fillcontractorprojecttimesheetapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";

const FillTimesheetForm = ({ handleSubmit, id }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fillcontractorprojecttimesheetapicall(id);
        if (response.success) {
          setProjects(response.result);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProjectData();
  }, [fillcontractorprojecttimesheetapicall, id]);

  const formik = useFormik({
    initialValues: {
      timesheets: [
        {
          Staff_Id: id,
          hours: "",
          project: "",
          day: "",
          Description: "",
          task_description: "",
          attachement: null,
        },
      ],
    },
    validationSchema: Yup.object({
      timesheets: Yup.array().of(
        Yup.object({
          hours: Yup.string().required("Hours are required"),
          project: Yup.string().required("Project is required"),
          day: Yup.string().required("Day is required"),
          Description: Yup.string().required("Description is required"),
          task_description: Yup.string().required(
            "Task description is required"
          ),
          attachement: Yup.mixed().required("Attachment is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });

  const handleAddEntry = () => {
    formik.setValues({
      timesheets: [
        ...formik.values.timesheets,
        {
          Staff_Id: id,
          hours: "",
          project: "",
          day: "",
          Description: "",
          task_description: "",
          attachement: null,
        },
      ],
    });
  };

  const handleRemoveEntry = (index) => {
    const updatedTimesheets = formik.values.timesheets.filter(
      (_, i) => i !== index
    );
    formik.setValues({ timesheets: updatedTimesheets });
  };

  return (
    <Container maxWidth="md" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Multi-Add Timesheet Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {formik.values.timesheets.map((entry, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hours"
                    name={`timesheets[${index}].hours`}
                    value={entry.hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.timesheets?.[index]?.hours &&
                      Boolean(formik.errors.timesheets?.[index]?.hours)
                    }
                    helperText={
                      formik.touched.timesheets?.[index]?.hours &&
                      formik.errors.timesheets?.[index]?.hours
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Project</InputLabel>
                    <Select
                      name={`timesheets[${index}].project`}
                      value={entry.project}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {projects.map((item) => (
                        <MenuItem key={item.ProjectId} value={item.ProjectId}>
                          {item.Project_Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Day"
                    InputLabelProps={{ shrink: true }}
                    name={`timesheets[${index}].day`}
                    value={entry.day}
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
                    name={`timesheets[${index}].Description`}
                    value={entry.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task Description"
                    name={`timesheets[${index}].task_description`}
                    value={entry.task_description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name={`timesheets[${index}].attachement`}
                    onChange={(event) =>
                      formik.setFieldValue(
                        `timesheets[${index}].attachement`,
                        event.currentTarget.files[0]
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEntry(index)}
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
              onClick={handleAddEntry}
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
