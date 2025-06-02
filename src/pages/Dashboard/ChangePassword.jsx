import React from "react";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import { Button, Grid2, styled } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputPassword from "../../common/InputPassword/InputPassword";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(6, "New Password must be at least 6 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await apiInstance.post(
          "/v1/user/changer-password",
          values
        );
        if (response?.data?.success) {
          dispatch(setLoader(false));
          toast.success(response?.data?.message);
        } else {
          dispatch(setLoader(false));
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Change Password" />
      <div className="change_password_wrapper">
        <div className="change_password_wrapper_box">
          <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ md: 4, lg: 6, sm: 12 }}>
                <InputPassword
                  labelText={"Old Password"}
                  placeholder={"Please Enter your Old password"}
                  {...formik.getFieldProps("oldPassword")}
                />

                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <ErrorText>{formik.errors.oldPassword}</ErrorText>
                )}
              </Grid2>
              <Grid2 size={{ md: 4, lg: 6, sm: 12 }}>
                <InputPassword
                  labelText={"New  Password"}
                  placeholder={"Please Enter New password"}
                  {...formik.getFieldProps("newPassword")}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <ErrorText>{formik.errors.newPassword}</ErrorText>
                )}
              </Grid2>
              <Grid2 size={{ md: 4, lg: 6, sm: 12 }}>
                <InputPassword
                  labelText={"Confirm  Password"}
                  {...formik.getFieldProps("confirmPassword")}
                  placeholder={"Please Enter Confirm password"}
                  type="password"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <ErrorText>{formik.errors.confirmPassword}</ErrorText>
                  )}
              </Grid2>
              <Grid2 size={{ md: 12, lg: 12, sm: 12 }}>
                <Button
                  type="submit"
                  sx={{
                    background: "#6560f0",
                    color: "white",
                    // width: "100%",
                  }}
                >
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </div>
      </div>
    </LayoutDesign>
  );
};

export default ChangePassword;

const ChangerpasswordWrapper = styled("div")`({
display:flex;
justify-content:center;
})`;

const ErrorText = styled("span")`
  color: #e63946;
  font-size: 14px;
  margin-top: 4px;
`;
