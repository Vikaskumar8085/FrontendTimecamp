import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import Input from "../../../common/Input/Input";
import InputSelect from "../../../common/InputSelect/InputSelect";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";
import TextArea from "../../../common/TextArea/TextArea";

const validationSchema = Yup.object({
  MilestoneId: Yup.string().required("Milestone is required"),
  Task_Name: Yup.string().required("Task Name is required"),
  StartDate: Yup.date()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),
  EndDate: Yup.date()
    .required("End Date is required")
    .typeError("End Date must be a valid date")
    .min(Yup.ref("StartDate"), "End Date can't be before Start Date"),
  Estimated_Time: Yup.number()
    .required("Estimated Time is required")
    .positive("Estimated Time must be positive"),
  Priority: Yup.string().required("Priority is required"),
  Task_Description: Yup.string(),
  Attachment: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    ),
  Resource_Id: Yup.string().required("Resource Id is required"),
});

const AddProjectTask = ({ isMilestonoeresourcesdata, TaskHandleSubmit }) => {
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
      Resource_Id: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("MilestoneId", values.MilestoneId);
      formData.append("Task_Name", values.Task_Name);
      formData.append("StartDate", values.StartDate);
      formData.append("EndDate", values.EndDate);
      formData.append("Estimated_Time", values.Estimated_Time);
      formData.append("Priority", values.Priority);
      formData.append("Task_Description", values.Task_Description);
      formData.append("file", values.Attachment);
      formData.append("Resource_Id", values.Resource_Id);
      TaskHandleSubmit(formData);

      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ sm: 12, md: 6 }}>
            <InputSelect
              labelText={"MileStone Name"}
              {...formik.getFieldProps("MilestoneId")}
              value={formik.values.MilestoneId}
              onChange={formik.handleChange}
              placeholder="--- Please select Milestone ---"
              options={isMilestonoeresourcesdata?.map((item) => ({
                label: item.Name,
                value: item.Milestone_id,
              }))}
            />

            {formik.touched.MilestoneId && formik.errors.MilestoneId && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.MilestoneId}
              </div>
            )}
          </Grid>
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <InputSelect
              name={"Resource_Id"}
              labelText={"Resource"}
              placeholder="--- please select Resource ---"
              {...formik.getFieldProps("Resource_Id")}
              value={formik.values.Resource_Id}
              onChange={formik.handleChange}
              options={resources.map((item) => ({
                label: item.FirstName,
                value: item.staff_id,
              }))}
            />
            {formik.touched.Resource_Id && formik.errors.Resource_Id && (
              <div style={{ color: "red", font: "14px" }}>
                {formik.errors.Resource_Id}
              </div>
            )}
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Input
              labelText="Task Name"
              placeholder={"Please Enter your Task Names"}
              name="Task_Name"
              value={formik.values.Task_Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Task_Name && formik.errors.Task_Name && (
              <div style={{ color: "red", font: "14px" }}>
                {formik.errors.Task_Name}
              </div>
            )}
          </Grid>

          <Grid size={{ sm: 12, md: 6 }}>
            <Input
              labelText="Start Date"
              name="StartDate"
              type="date"
              value={formik.values.StartDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.StartDate && formik.errors.StartDate && (
              <div style={{ fontSize: "14px", color: "red" }}>
                {formik.errors?.StartDate}
              </div>
            )}
          </Grid>

          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <Input
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

          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <Input
              labelText="Estimate Time (Hours)"
              placeholder={"Please Enter Estimate Time Hours"}
              name="Estimated_Time"
              type="number"
              value={formik.values.Estimated_Time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Estimated_Time && formik.errors.Estimated_Time && (
              <div style={{ color: "red", font: "14px" }}>
                {formik.errors.Estimated_Time}
              </div>
            )}
          </Grid>

          <Grid size={{ sm: 12, xs: 12 }}>
            <InputSelect
              labelText="Priority Mode"
              name="Priority"
              value={formik.values.Priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={[
                { value: "HIGH", label: "HIGH" },
                { value: "MEDIUM", label: "MEDIUM" },
                { value: "LOW", label: "LOW" },
              ]}
            />

            {formik.touched.Priority && formik.errors.Priority && (
              <div style={{ color: "red", font: "14px" }}>
                {formik.errors.Priority}
              </div>
            )}
          </Grid>

          <Grid size={{ sm: 12, xs: 12 }}>
            <TextArea
              labelText="Task Description"
              name="Task_Description"
              value={formik.values.Task_Description}
              placeholder="Please Enter task Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Task_Description &&
              formik.errors.Task_Description && (
                <div style={{ font: "14px", color: "red" }}>
                  {formik.errors.Task_Description}
                </div>
              )}
          </Grid>
          <Grid size={{ sm: 12, xs: 12 }}>
            <InputFileupload
              type="file"
              name="Attachment"
              onChange={(event) =>
                formik.setFieldValue("Attachment", event.currentTarget.files[0])
              }
            />
          </Grid>

          <Grid size={{ sm: 12, xs: 12 }}>
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

export default AddProjectTask;
