import {Box, Button, Container} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import Input from "../../../common/Input/Input";
import * as Yup from "yup";
import {useFormik} from "formik";
import moment from "moment";

const validationSchema = Yup.object({
  Name: Yup.string()
    .required("First Name is required")
    .min(2, "Name must be at least 2 characters"),
  date: Yup.date().required("Date is required").typeError("Invalid date"),
});
const AddHoliday = ({IsEdit, handleSubmit}) => {
  const formik = useFormik({
    initialValues: {
      Name: IsEdit !== null ? IsEdit?.Name : "",
      date: IsEdit !== null ? moment(IsEdit.date).format("YYYY-MM-DD") : "", // format date
    },
    validationSchema,
    onSubmit: async (values) => {
      if (IsEdit === null) {
        handleSubmit(values);
      } else {
        console.log("values", values);
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
              <Grid size={{md: 12, sm: 12}}>
                <Input
                  labelText="Name"
                  type="text"
                  name="Name"
                  placeholder="Enter Holiday Name"
                  value={formik.values.Name}
                  {...formik.getFieldProps("Name")}
                />

                {formik.touched.Name && formik.errors.Name && (
                  <div style={{color: "red", fontSize: "14px"}}>
                    {formik.errors.Name}
                  </div>
                )}
              </Grid>

              <Grid size={{md: 12, sm: 12}}>
                <Input
                  labelText="Date"
                  type="date"
                  placeholder={"Enter Date"}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <div style={{color: "red", fontSize: "14px"}}>
                    {formik.errors.date}
                  </div>
                )}
              </Grid>

              <Grid size={{md: 12, sm: 12}}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    background: "#6560f0",
                    width: "100%",
                    padding: "8px 10px",
                    margin: "10px 0px",
                    color: "white",
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

export default AddHoliday;
