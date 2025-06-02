import React from "react";
import {useFormik} from "formik";
import {
  TextField,
  Button,
  Grid,
  Container,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";

const ProjectUpload = () => {
  return <DefaultLayout>{/* <MilestoneForm /> */}</DefaultLayout>;
};

export default ProjectUpload;

const MilestoneForm = () => {
  const formik = useFormik({
    initialValues: {
      milestones: [
        {
          milestoneName: "",
          description: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  const handleAddMilestone = () => {
    formik.setFieldValue("milestones", [
      ...formik.values.milestones,
      {milestoneName: "", description: "", startDate: "", endDate: ""},
    ]);
  };

  const handleRemoveMilestone = (index) => {
    const newMilestones = [...formik.values.milestones];
    newMilestones.splice(index, 1);
    formik.setFieldValue("milestones", newMilestones);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
          <Typography variant="h5" component="h1" gutterBottom>
            Milestone Form
          </Typography>
          {formik.values.milestones.map((milestone, index) => (
            <Box key={index} sx={{marginBottom: 2}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Milestone Name"
                    name={`milestones[${index}].milestoneName`}
                    value={milestone.milestoneName}
                    onChange={formik.handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name={`milestones[${index}].description`}
                    value={milestone.description}
                    onChange={formik.handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name={`milestones[${index}].startDate`}
                    type="date"
                    value={milestone.startDate}
                    onChange={formik.handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name={`milestones[${index}].endDate`}
                    type="date"
                    value={milestone.endDate}
                    onChange={formik.handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {formik.values.milestones.length > 1 && (
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveMilestone(index)}
                      fullWidth
                    >
                      Remove Milestone
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircle />}
            onClick={handleAddMilestone}
            fullWidth
            sx={{marginBottom: 2}}
          >
            Add Another Milestone
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};
