import {useFormik} from "formik";
import React from "react";
import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcons from "@mui/icons-material/Add";
import Input from "../../../common/Input/Input";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  Department_Name: Yup.string()
    .required("Department name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters are allowed"),
});

const AddDepartment = ({handleSubmit, isEdit, updatedepartment}) => {
  const formik = useFormik({
    initialValues: {
      Department_Name: isEdit !== null ? isEdit.Department_Name : null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit !== null) {
          updatedepartment(values);
          formik.resetForm();
        } else {
          handleSubmit(values);
          formik.resetForm();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{sm: 12, xs: 12}}>
                <Input
                  id="Department_Name"
                  name="Department_Name"
                  labelText="Department Name"
                  value={formik.values.Department_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={"Please Enter Department Name"}
                />
                {formik.touched.Department_Name &&
                  formik.errors.Department_Name && (
                    <div style={{color: "red", fontSize: "14px"}}>
                      {" "}
                      {formik.errors?.Department_Name}
                    </div>
                  )}
              </Grid>
              <Grid size={{sm: 12, xs: 12}}>
                <Button
                  startIcon={<AddIcons />}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    background: "#6560f0",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default AddDepartment;
