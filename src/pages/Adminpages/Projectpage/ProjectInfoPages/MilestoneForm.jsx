import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {TextField, Button, Container, IconButton} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import Input from "../../../../common/Input/Input";
import TextArea from "../../../../common/TextArea/TextArea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const MilestoneForm = ({handleSubmit}) => {
  const formik = useFormik({
    initialValues: {
      milestones: [
        {MilestoneName: "", Description: "", StartDate: "", EndDate: ""},
      ],
    },
    validationSchema: Yup.object({
      milestones: Yup.array().of(
        Yup.object({
          MilestoneName: Yup.string().required("Milestone name is required"),
          Description: Yup.string().required("Description is required"),
          StartDate: Yup.date().required("Start date is required"),
          EndDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("StartDate"), "End date cannot be before start date"),
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

  // Function to add a new milestone
  const handleAddMilestone = () => {
    formik.setValues({
      ...formik.values,
      milestones: [
        ...formik.values.milestones,
        {MilestoneName: "", Description: "", StartDate: "", EndDate: ""},
      ],
    });
  };

  // Function to remove a milestone
  const handleRemoveMilestone = (index) => {
    const updatedMilestones = formik.values.milestones.filter(
      (_, i) => i !== index
    );
    formik.setValues({...formik.values, milestones: updatedMilestones});
  };

  return (
    <Container maxWidth="md" sx={{p: 3}}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {formik.values.milestones.map((milestone, index) => (
            <Grid key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{md: 12, xs: 12}}>
                  <Input
                    labelText="Milestone Name"
                    placeholder={"Please Enter Milestones"}
                    name={`milestones[${index}].MilestoneName`}
                    value={milestone.MilestoneName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.milestones?.[index]?.MilestoneName &&
                    formik.errors.milestones?.[index]?.MilestoneName && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {formik.errors.milestones[index].MilestoneName}
                      </div>
                    )}
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 12}}>
                  <TextArea
                    labelText="Description"
                    name={`milestones[${index}].Description`}
                    value={milestone.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="please write milestone Description"
                  />
                  <ReactQuill
                    name={`milestones[${index}].Description`}
                    value={milestone.Description}
                    onChange={(content) =>
                      formik.setFieldValue("Description", content)
                    }
                  />

                  {formik.touched.milestones?.[index]?.Description &&
                    formik.errors.milestones?.[index]?.Description && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {formik.errors.milestones[index].Description}
                      </div>
                    )}
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6}}>
                  <Input
                    type="date"
                    labelText="Start Date"
                    name={`milestones[${index}].StartDate`}
                    value={milestone.StartDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.milestones?.[index]?.StartDate &&
                    formik.errors.milestones?.[index]?.StartDate && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {formik.errors.milestones[index].StartDate}
                      </div>
                    )}
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6}}>
                  <Input
                    type="date"
                    labelText="End Date"
                    name={`milestones[${index}].EndDate`}
                    value={milestone.EndDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.milestones?.[index]?.EndDate &&
                    formik.errors.milestones?.[index]?.EndDate && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {formik.errors.milestones[index].StartDate}
                      </div>
                    )}
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveMilestone(index)}
                    disabled={formik.values.milestones.length === 1}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid size={{md: 6}}>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </Grid>
          <Grid size={{md: 6, sm: 12}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMilestone}
              startIcon={<Add />}
            >
              Add Milestone
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MilestoneForm;
