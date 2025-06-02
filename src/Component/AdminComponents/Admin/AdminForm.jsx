import React, { useState } from "react";
import { Container, Button, Grid2, Box } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import Input from "../../../common/Input/Input";
import InputPassword from "../../../common/InputPassword/InputPassword";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import * as Yup from "yup";

const AdminForm = ({ handleSubmit, IsEdit, setIsEdit, updatehandle }) => {
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);

  // validation
  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("First name is required"),
    LastName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Last name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().min(6, "Password must be at least 6 characters"),

    Phone: Yup.string().min(10, "Enter a valid phone number"),

    ConfirmPassword: Yup.string().oneOf(
      [Yup.ref("Password"), null],
      "Passwords must match"
    ),
    Photo: Yup.mixed().nullable(),
  });

  // validation
  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit ? IsEdit.FirstName || "" : "",
      LastName: IsEdit ? IsEdit?.LastName || "" : "",
      Email: IsEdit ? IsEdit?.Email || "" : "",
      Password: "",
      Photo: IsEdit ? IsEdit?.Photo || "" : null,
      Phone: IsEdit ? IsEdit?.Phone || "" : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formdata = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formdata.append(key, value);
        });

        if (IsEdit === null) {
          handleSubmit(formdata);
          formik.resetForm();
          setIsEdit(null);
        } else {
          console.log(values,"values")
          updatehandle(formdata);
          formik.resetForm();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file)); // Create image preview URL
  //   }
  // };

  return (
    <Container maxWidth="md">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 Container spacing={4}>
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
              <InputImageUpload
                name={"Photo"}
                value={formik.values.Photo}
                onChange={formik.setFieldValue}
              />
              {formik.touched.Photo && formik.errors.Photo && (
                <div style={{ color: "red", font: "14px" }}>
                  {formik.errors.Photo}
                </div>
              )}
            </Grid2>
            <Grid2 size={{ sm: 12, md: 6, xs: 12 }} sx={{ mt: 3 }}>
              <Input
                style={{ width: "100%" }}
                placeholder={"Please Enter Your First Name"}
                labelText={"First Name"}
                name={"FirstName"}
                {...formik.getFieldProps("FirstName")}
              />

              {formik.touched.FirstName && formik.errors.FirstName && (
                <div style={{ color: "red" }}>{formik.errors.FirstName}</div>
              )}
            </Grid2>
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
              <Input
                style={{ width: "100%" }}
                placeholder={"please Enter Your Last Name"}
                labelText={"LastName"}
                {...formik.getFieldProps("LastName")}
              />
              {formik.touched.LastName && formik.errors.LastName && (
                <div style={{ color: "red" }}>{formik.errors.LastName}</div>
              )}
            </Grid2>
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
              <Input
                style={{ width: "100%" }}
                type={"Email"}
                placeholder={"please Enter Your Last Name"}
                labelText={"Email"}
                {...formik.getFieldProps("Email")}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div style={{ color: "red" }}>{formik.errors.Email}</div>
              )}
            </Grid2>
            {IsEdit === null && (
              <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
                <InputPassword
                  type={"password"}
                  placeholder="Please Enter your password"
                  labelText={"Password"}
                  {...formik.getFieldProps("Password")}
                  style={{ width: "100%" }}
                />
                {formik.touched.Password && formik.errors.Password && (
                  <div style={{ color: "red" }}>{formik.errors.Password}</div>
                )}
              </Grid2>
            )}

            {IsEdit === null && (
              <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
                <InputPassword
                  type={"password"}
                  placeholder="Please Enter Confirm password"
                  labelText={"Confirm Password"}
                  {...formik.getFieldProps("ConfirmPassword")}
                  style={{ width: "100%" }}
                />
                {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword && (
                    <div style={{ color: "red" }}>
                      {formik.errors.ConfirmPassword}
                    </div>
                  )}
              </Grid2>
            )}
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
              <label
                htmlFor="phone-input"
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#86919b",
                  fontWeight: "500",
                }}
              >
                Phone Number
              </label>

              <PhoneInput
                inputStyle={{ width: "100%" }}
                country={"in"}
                style={{ width: "100%" }}
                value={formik.values.Phone}
                onChange={(value) => formik.setFieldValue("Phone", value)}
                onBlur={() => formik.setFieldTouched("Phone", true)}
              />

              {formik.touched.Phone && formik.errors.Phone && (
                <div style={{ color: "red", font: "14px" }}>
                  {formik.errors.Phone}
                </div>
              )}
            </Grid2>

            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 3 }}>
              <Button
                type="submit"
                sx={{
                  background: "#6560f0",
                  color: "white",
                  width: "100%",
                }}
              >
                submit
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
};

export default AdminForm;
