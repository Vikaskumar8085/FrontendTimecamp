import React from "react";
import {
  Button,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Grid2,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../../../common/Input/Input";
import InputPassword from "../../../common/InputPassword/InputPassword";
import PhoneInput from "react-phone-input-2";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
const validationSchema = Yup.object({
  Company_Name: Yup.string().required("Company name is required"),
  Client_Name: Yup.string().required("Client name is required"),
  Client_Email: Yup.string().email().required("Client email is required"),
  Password: Yup.string().min(6).label("Password is required"),
  Client_Address: Yup.string().required("Address is required"),
  Client_Postal_Code: Yup.string().required("Postal Code is required"),
  Client_Phone: Yup.string().required("Phone number is required"),
  GstNumber: Yup.string().optional(),
  profileImage: Yup.mixed().required("Image is required"),
  System_Access: Yup.boolean()
    .optional()
    .nullable()
    .label("System Access")
    .transform((value) => (value === "" ? null : value))
    .default(false),
});
const ClientForm = ({ handleSubmit, isEdit, handleUpdate }) => {
  // const formik = useFormik({
  //   initialValues: {
  //     Company_Name: isEdit !== null ? isEdit?.Company_Name : "",
  //     Client_Name: isEdit !== null ? isEdit.Client_Name : "",
  //     Client_Email: isEdit !== null ? isEdit.Client_Email : "",
  //     Client_Phone: isEdit !== null ? isEdit.Client_Phone : "",
  //     Client_Address: isEdit !== null ? isEdit.Client_Address : "",
  //     Client_Postal_Code: isEdit !== null ? isEdit.Client_Postal_Code : "",
  //     Password: isEdit !== null ? "" : "",
  //     GstNumber: isEdit !== null ? isEdit.GstNumber : "",
  //     System_Access: isEdit !== null ? isEdit.System_Access : false,
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     console.log(values, null, 2);
  //     // if (isEdit !== null) {
  //     // handleUpdate(values);
  //     // formik.resetForm();
  //     // } else {
  //     // handleSubmit(values);
  //     // formik.resetForm();
  //     // }

  //     // console.log(values,'akdfalskd')
  //   },
  // });
  const formik = useFormik({
    initialValues: {
      Company_Name: isEdit?.Company_Name ?? "",
      Client_Name: isEdit?.Client_Name ?? "",
      Client_Email: isEdit?.Client_Email ?? "",
      Password: "",
      Client_Address: isEdit?.Client_Address ?? "",
      Client_Postal_Code: isEdit?.Client_Postal_Code ?? "",
      Client_Phone: isEdit?.Client_Phone ?? "",
      GstNumber: isEdit?.GstNumber ?? "",
      profileImage: isEdit?.Client_Photo ?? null,
      System_Access: isEdit?.System_Access ?? false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log(values, "vlaues");
      if (isEdit === null) {
        handleSubmit(formData);
        formik.resetForm();
      } else {
        console.log(values);
        handleUpdate(formData);
        formik.resetForm();
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          p: 4,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ md: 12, lg: 12, sm: 12, xs: 12 }}>
              <InputImageUpload
                name="profileImage"
                value={formik.values.profileImage}
                onChange={formik.setFieldValue}
              />
              {formik.touched.profileImage && formik.errors.profileImage && (
                <div style={{ color: "red" }}>{formik.errors.profileImage}</div>
              )}
            </Grid2>
            <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Input
                labelText={"Comapny Name"}
                type="text"
                placeholder={"Please Enter Company Name"}
                {...formik.getFieldProps("Company_Name")}
              />{" "}
              {formik.touched.Company_Name && formik.errors.Company_Name && (
                <div style={{ color: "red" }}>{formik.errors.Company_Name}</div>
              )}
            </Grid2>
            <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Input
                labelText={"Client Name"}
                type="text"
                placeholder={"Please Enter Client Name"}
                {...formik.getFieldProps("Client_Name")}
              />
              {formik.touched.Client_Name && formik.errors.Client_Name && (
                <div style={{ color: "red" }}>{formik.errors.Client_Name}</div>
              )}
            </Grid2>
            <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Input
                type="Email"
                labelText={"Client Email"}
                placeholder={"Please Enter Client Email"}
                {...formik.getFieldProps("Client_Email")}
              />{" "}
              {formik.touched.Client_Email && formik.errors.Client_Email && (
                <div style={{ color: "red" }}>{formik.errors.Client_Email}</div>
              )}
            </Grid2>

            {isEdit === null && (
              <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
                <InputPassword
                  labelText={"Password"}
                  placeholder={"Please Enter Client Email"}
                  {...formik.getFieldProps("Password")}
                />{" "}
                {formik.touched.Password && formik.errors.Password && (
                  <div style={{ color: "red" }}>{formik.errors.Password}</div>
                )}
              </Grid2>
            )}
            <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Input
                labelText={"Address"}
                placeholder={"Please Enter Client Address"}
                {...formik.getFieldProps("Client_Address")}
              />{" "}
              {formik.touched.Client_Address &&
                formik.errors.Client_Address && (
                  <div style={{ color: "red" }}>
                    {formik.errors.Client_Address}
                  </div>
                )}
            </Grid2>
            <Grid2 size={{ md: 6, lg: 6, sm: 12, xs: 12 }}>
              <Input
                labelText={"Postal Code"}
                type={"Number"}
                placeholder={"Please Enter Client Postal Code"}
                {...formik.getFieldProps("Client_Postal_Code")}
              />{" "}
              {formik.touched.Client_Postal_Code &&
                formik.errors.Client_Postal_Code && (
                  <div style={{ color: "red" }}>
                    {formik.errors.Client_Postal_Code}
                  </div>
                )}
            </Grid2>
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }} sx={{ mt: 1.3 }}>
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
                placeholder="Enter phone number"
                value={formik.values.Client_Phone}
                onChange={(value) =>
                  formik.setFieldValue("Client_Phone", value)
                }
              />
              {formik.touched.Client_Phone && formik.errors.Client_Phone && (
                <div style={{ color: "red", font: "14px" }}>
                  {formik.errors.Client_Phone}
                </div>
              )}
            </Grid2>
            <Grid2 size={{ sm: 12, xs: 12, md: 6 }}>
              <Input
                labelText={"Gst Number"}
                placeholder={"Please Enter your Gst Number"}
                {...formik.getFieldProps("GstNumber")}
              />
              {formik.touched.GstNumber && formik.errors.GstNumber && (
                <div style={{ color: "red" }}>{formik.errors.GstNumber}</div>
              )}
            </Grid2>

            <Grid2 size={{ sm: 12, xs: 12, md: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="System_Access"
                    color="primary"
                    checked={formik.values.System_Access}
                    onChange={formik.handleChange}
                  />
                }
                label="System Access"
              />
              {formik.touched.System_Access && formik.errors.System_Access && (
                <div style={{ color: "red" }}>
                  {formik.errors.System_Access}
                </div>
              )}
            </Grid2>
            <Grid2 size={{ sm: 12, xs: 12, md: 12 }}>
              <Button
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
                  width: "100%",
                  color: "white",
                }}
                type="submit"
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

export default ClientForm;
