import {useFormik} from "formik";
import React from "react";
import {Button, Box, Typography, TextField, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DesignationValidate from "../../../validation/mastervalidation/Designation";
import Input from "../../../common/Input/Input";
const AddDesignation = ({handleSubmit, isEdit, updateDesignation}) => {
  const formik = useFormik({
    initialValues: {
      Designation_Name: isEdit !== null ? isEdit?.Designation_Name : null,
    },
    validationSchema: DesignationValidate,
    onSubmit: async (values) => {
      try {
        if (isEdit !== null) {
          updateDesignation(values);
          formik.resetForm();
        } else {
          handleSubmit(values);
          formik.resetForm();
        }
        formik.resetForm();
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
                  id="Designation_Name"
                  placeholder={"Please Enter your Designation Name "}
                  name="Designation_Name"
                  labelText="Designation Name"
                  value={formik.values.Designation_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Designation_Name &&
                  formik.errors.Designation_Name && (
                    <div style={{color: "red", fontSize: "14px"}}>
                      {formik.errors?.Designation_Name}
                    </div>
                  )}
              </Grid>
              <Grid size={{sm: 12, xs: 12}}>
                <Button
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

export default AddDesignation;
