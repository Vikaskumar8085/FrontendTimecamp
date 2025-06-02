import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import InputSelect from "../../../common/InputSelect/InputSelect";
import Input from "../../../common/Input/Input";
import TextArea from "../../../common/TextArea/TextArea";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";

const ManagerProjectTaskForm = ({
  isMilestonoeresourcesdata,
  handleaddtask,
}) => {
  const resources = isMilestonoeresourcesdata[0]?.Resourcedata || [];

  const formik = useFormik({
    initialValues: {
      MilestoneId: "",
      Task_Name: "",
      StartDate: "",
      EndDate: "",
      Estimated_Time: "",
      Priority: "",
      Task_Description: "",
      Attachment: null,
      Resource_Id: "", // new field for selected resources
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values, ">>>>>>>>.. .............values");
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);
      handleaddtask(formData);

      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputSelect
              {...formik.getFieldProps("MilestoneId")}
              value={formik.values.MilestoneId}
              placeholder="--- Please  select Mile stone ---"
              onChange={formik.handleChange}
              labelText={"Select Milestone"}
              options={isMilestonoeresourcesdata?.map((item) => ({
                label: item.Name,
                value: item.Milestone_id,
              }))}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              labelText="Task Name"
              name="Task_Name"
              value={formik.values.Task_Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={"Please Enter Task Name"}
            />
            {formik.touched.Task_Name && formik.errors.Task_Name && (
              <div style={{ font: "14px", color: "red" }}>
                {formik.errors.Task_Name}
              </div>
            )}
          </Grid>

          <Grid item xs={6}>
            <Input
              labelText="Start Date"
              name="StartDate"
              type="date"
              value={formik.values.StartDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.StartDate && Boolean(formik.errors.StartDate)
              }
              helperText={formik.touched.StartDate && formik.errors.StartDate}
            />
            {formik.touched.StartDate && formik.errors.StartDate && (
              <div style={{ font: "14px", color: "red" }}>
                {formik.errors.StartDate}
              </div>
            )}
          </Grid>

          <Grid item xs={6}>
            <Input
              fullWidth
              labelText="Expected End Date"
              name="EndDate"
              type="date"
              value={formik.values.EndDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.EndDate && formik.errors.EndDate && (
              <div style={{ font: "14px", color: "red" }}>
                {formik.errors.EndDate}
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <Input
              labelText="Estimate Time (Hours)"
              name="Estimated_Time"
              type="number"
              placeholder={"Please enter estimate time hours"}
              value={formik.values.Estimated_Time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Estimated_Time && formik.errors.Estimated_Time && (
              <div style={{ font: "14px", color: "red" }}>
                {formik.errors?.Estimated_Time}
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <InputSelect
              labelText="Priority Mode"
              name="Priority"
              value={formik.values.Priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={[
                { value: "LOW", label: "LOW" },
                { value: "HIGH", label: "HIGH" },
                { value: "MEDIUM", label: "MEDIUM" },
              ]}
            />

            {formik?.touched.Priority && formik.errors.Priority && (
              <div style={{ color: "red", font: "14px" }}>
                {formik.errors?.Priority}
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextArea
              labelText="Task Description"
              name="Task_Description"
              value={formik.values.Task_Description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Task_Description &&
              formik.errors.Task_Description && (
                <div style={{ color: "red", font: "14px" }}>
                  {formik.errors.Task_Description}
                </div>
              )}
          </Grid>

          <Grid item xs={12}>
            <InputFileupload
              type="file"
              name="Attachment"
              onChange={(event) =>
                formik.setFieldValue("Attachment", event.currentTarget.files[0])
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Resources</InputLabel>
              <Select
                {...formik.getFieldProps("Resource_Id")}
                value={formik.values.Resource_Id}
                onChange={formik.handleChange}
              >
                {resources.length > 0 ? (
                  resources.map((resource) => (
                    <MenuItem key={resource.staff_id} value={resource.staff_id}>
                      {resource.FirstName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No resources available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              sx={{
                background: "#2c3e50",
                padding: "8px 10px",
                color: "white",
              }}
              variant="contained"
              color="primary"
            >
              Submit Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ManagerProjectTaskForm;
