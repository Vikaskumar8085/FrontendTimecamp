import {Button, Box, Container} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useFormik} from "formik";
import React from "react";
import AddIcons from "@mui/icons-material/Add";
import Input from "../../../common/Input/Input";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  RoleName: Yup.string()
    .required("Role name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
});
const AddRoles = ({handleSubmit, isEdit, handleupdate}) => {
  const formik = useFormik({
    initialValues: {
      RoleName: isEdit !== null ? isEdit.RoleName : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEdit !== null) {
          handleupdate(values);
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
                id="Role_Name"
                name="RoleName"
                labelText="Role Name"
                value={formik.values.RoleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Please Enter your Role Name "}
              />
              {formik.touched.RoleName && formik.errors.RoleName && (
                <div style={{color: "red", fontSize: "14px"}}>
                  {formik.errors?.RoleName}
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
  );
};

export default AddRoles;
