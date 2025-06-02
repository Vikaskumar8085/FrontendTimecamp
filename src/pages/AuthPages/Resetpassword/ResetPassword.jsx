import React, {useState} from "react";
import {Grid2} from "@mui/material";
import signupimage from "../../../assets/auth/signupImage-removebg-preview.png";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useParams} from "react-router-dom";
import apiInstance from "../../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import InputPassword from "../../../common/InputPassword/InputPassword";
import Button from "../../../common/Button/Button";
import timecamplogo from "../../../assets/auth/Screenshot from 2025-04-22 17-26-29.png";
const ResetPassword = () => {
  const {resetToken} = useParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, "values");
        dispatch(setLoader(true));
        const response = await apiInstance.put(
          `/v1/user/reset-password/${resetToken}`,
          values.password
        );
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          dispatch(setLoader(false));

          formik.resetForm();
        } else {
          formik.resetForm();
          toast.error(response?.data?.message);
          dispatch(setLoader(false));
        }
      } catch (error) {
        dispatch(setLoader(false));
        formik.resetForm();
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <>
      <div className="reset_password_wrapper">
        <div className="reset_password_bg_logo">
          <img src={timecamplogo} alt="no-image" srcset="" />
        </div>
        <Grid2 container spacing={2}>
          <Grid2 size={{sx: 12, sm: 12, md: 12, lg: 6}}>
            <div className="reset_password_left_side">
              <form onSubmit={formik.handleSubmit}>
                <div className="reset_password_left_side_title">
                  <h1 sx={{fontFamily: "Quicksand, sans-serif"}}>
                    {" "}
                    Reset Password!
                  </h1>
                  {/* <p sx={{fontFamily: "Quicksand, sans-serif"}}>
                      Don’t have an account Yet?
                      <Link to="/signup">Sign up here</Link>
                    </p> */}
                </div>
                <Grid2 container spacing={1} justifyContent={"center"}>
                  <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <InputPassword
                      labelText={"New Password"}
                      type={"password"}
                      {...formik.getFieldProps("password")}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {formik.errors.password}
                      </div>
                    )}
                  </Grid2>
                  <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <InputPassword
                      labelText={"Confirm Password"}
                      type={"password"}
                      {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </Grid2>
                  <Grid2 size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <Button style={{width: "100%"}} type={"submit "}>
                      submit
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </div>
          </Grid2>
          <Grid2
            size={{md: 12, lg: 6, xs: 12, sm: 12}}
            sx={{
              backgroundColor: "#f7f8f9",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block", // or 'flex' depending on layout
              },
            }}
          >
            <div className="reset_password_right_side">
              <div className="reset_password_right_side_box">
                <h6>Start managing your task faster & better!</h6>
              </div>
              <div className="reset_password_right_side_img">
                <img src={signupimage} alt="no-image" srcset="" />
              </div>
            </div>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
};

export default ResetPassword;
