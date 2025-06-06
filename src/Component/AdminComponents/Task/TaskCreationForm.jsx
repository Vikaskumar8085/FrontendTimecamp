import React, {useMemo} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Container, Box, Grid2, TextField, Button} from "@mui/material";
import Input from "../../../common/Input/Input";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";
import InputSelect from "../../../common/InputSelect/InputSelect";

const TaskCreationForm = ({Isprojectmilestonedata, TaskHandlesubmit}) => {
  const formik = useFormik({
    initialValues: {
      ProjectId: "",
      MilestoneId: "",
      Resource_Id: "",
      Task_Name: "",
      StartDate: "",
      EndDate: "",
      Estimated_Time: "",
      Priority: "",
      Task_Description: "",
      Attachment: null,
    },

    onSubmit: async (values) => {
      console.log(values, "?/////////////");
      const formData = new FormData();
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("ProjectId", values.ProjectId);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);
      TaskHandlesubmit(formData);

      formik.resetForm();
    },
  });

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("Attachment", file);
  };

  const data = "0";
  console.log(data, "this is the data");

  const selectedProject = useMemo(() => {
    return Isprojectmilestonedata.find(
      (project) => project.ProjectId === parseInt(formik.values.ProjectId)
    );
  }, [Isprojectmilestonedata, formik.values.ProjectId]);

  const milestones = useMemo(() => {
    return selectedProject?.mileStonedata || [];
  }, [selectedProject]);

  const resource = useMemo(() => {
    return selectedProject?.resourcedata || [];
  }, [selectedProject]);
  console.log(Isprojectmilestonedata, "fetchmilestone");
  return (
    <>
      <Container maxWidth="md">
        <Box sx={{p: 2, mt: 4}}>
          <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <InputSelect
                  name="ProjectId"
                  labelText="Select Project"
                  placeholder="---please select project---"
                  value={formik.values.ProjectId}
                  onChange={formik.handleChange} // Correct: pass the handler
                  onBlur={formik.handleBlur} // Optional but recommended
                  options={Isprojectmilestonedata.map((item) => ({
                    value: item.ProjectId,
                    label: item.Project_Name,
                  }))}
                />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <InputSelect
                  name="MilestoneId"
                  labelText="Select MileStone"
                  placeholder="---please select project Milestone---"
                  value={formik.values.MilestoneId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={milestones.map((item) => ({
                    value: item?.milestoneId,
                    label: item?.milestoneName,
                  }))}
                />
                {formik.touched.MilestoneId && formik.errors.MilestoneId && (
                  <div style={{color: "red", fontSize: "14px"}}>
                    {formik.errors.MilestoneId}
                  </div>
                )}
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <InputSelect
                  name="Resource_Id"
                  labelText="Select Resources"
                  placeholder="---please select project resources---"
                  onChange={formik.handleChange}
                  value={formik.values.Resource_Id}
                  onBlur={formik.handleBlur}
                  options={resource.map((item) => ({
                    label: item.resourceName,
                    value: item.resourceId,
                  }))}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <Input
                  fullWidth
                  labelText={"Task Name"}
                  placeholder={"Please Enter Your Task Name"}
                  name="Task_Name"
                  value={formik.values.Task_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Task_Name && Boolean(formik.errors.Task_Name)
                  }
                  helperText={
                    formik.touched.Task_Name && formik.errors.Task_Name
                  }
                />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <Input
                  fullWidth
                  labelText="Start Date"
                  placeholder={"Please Enter start Date"}
                  name="StartDate"
                  type="date"
                  InputLabelProps={{shrink: true}}
                  value={formik.values.StartDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.StartDate && Boolean(formik.errors.StartDate)
                  }
                  helperText={
                    formik.touched.StartDate && formik.errors.StartDate
                  }
                />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <Input
                  fullWidth
                  labelText="Expected End Date"
                  name="EndDate"
                  type="date"
                  InputLabelProps={{shrink: true}}
                  value={formik.values.EndDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.EndDate && Boolean(formik.errors.EndDate)
                  }
                  helperText={formik.touched.EndDate && formik.errors.EndDate}
                />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                <Input
                  fullWidth
                  labelText="Estimate Time (Hours)"
                  name="Estimated_Time"
                  type="number"
                  placeholder={"Please Enter Estimate Time"}
                  value={formik.values.Estimated_Time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Estimated_Time &&
                    Boolean(formik.errors.Estimated_Time)
                  }
                  helperText={
                    formik.touched.Estimated_Time &&
                    formik.errors.Estimated_Time
                  }
                />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}} sx={{mt: 1}}>
                <InputSelect
                  name="Priority"
                  labelText="Priority Mode"
                  placeholder="---please select project Priority---"
                  value={formik.values.Priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Priority && formik.errors.Priority}
                  options={[
                    {value: "HIGH", label: "high"},
                    {value: "MEDIUM", label: "medium"},
                    {value: "LOW", label: "low"},
                  ]}
                />
              </Grid2>

              <Grid2 size={{md: 12, lg: 12, sm: 12, xs: 12}}>
                <TextField
                  fullWidth
                  label="Task Description"
                  name="Task_Description"
                  multiline
                  rows={3}
                  value={formik.values.Task_Description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Task_Description &&
                    Boolean(formik.errors.Task_Description)
                  }
                  helperText={
                    formik.touched.Task_Description &&
                    formik.errors.Task_Description
                  }
                />
              </Grid2>

              <Grid2 size={{md: 12, lg: 12, sm: 12, xs: 12}}>
                <InputFileupload
                  type="file"
                  inputProps={{accept: ".csv"}}
                  onChange={handleFileChange}
                />
              </Grid2>

              <Grid2 item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    background: "#6560f0",
                    padding: "8px 10px",
                    color: "white",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Submit Task
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default TaskCreationForm;
