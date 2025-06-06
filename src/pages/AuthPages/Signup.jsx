import React, {useEffect} from "react";
import {Checkbox, FormControlLabel, FormHelperText, Grid2} from "@mui/material";
import "@fontsource/quicksand";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import {useFormik} from "formik";
import {signupapicall} from "../../ApiServices/Authapiservices";
import toast from "react-hot-toast";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import InputPassword from "../../common/InputPassword/InputPassword";
import signupimage from "../../assets/auth/signupImage-removebg-preview.png";
import {useMediaQuery, useTheme} from "@mui/material";
import timecamplogo from "../../assets/auth/Screenshot from 2025-04-22 17-26-29.png";
const Signup = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      Photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      Password: "",
      ConfirmPassword: "",
      Phone: "",
      Term: false,
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("First name is required"),
      LastName: Yup.string().required("Last name is required"),
      Email: Yup.string().email("Invalid email").required("Email is required"),
      Address: Yup.string().required("Address is required"),
      Password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      Phone: Yup.string().required("Phone number is required"),
      Term: Yup.bool().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values, "values");
        dispatch(setLoader(true));
        const response = await signupapicall(values);
        if (response.success) {
          window.location.href = "/login";
          toast.success(response.message);
          dispatch(setLoader(false));
        } else {
          dispatch(setLoader(false));
          toast.error(response.message);
        }
      } catch (error) {
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message || "something went wrong");
      }
    },
  });

  function redirectfunc() {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }
  const renderError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <FormHelperText error>{formik.errors[field]}</FormHelperText>
    ) : null;

  useEffect(() => {
    redirectfunc();
  }, [0]);
  return (
    <>
      <div className="signup_wrapper">
        <div className="signup_wrapper_logo">
          <img src={timecamplogo} alt="no-image" srcset="" />
        </div>
        <div className="signup_box">
          <Grid2 container justifyContent={"center"}>
            <Grid2 size={{md: 12, lg: 6}}>
              <div className="signup_left_side">
                <form onSubmit={formik.handleSubmit}>
                  <div className="singup_left_side_title">
                    <h1 sx={{fontFamily: "Quicksand, sans-serif"}}>
                      {" "}
                      Sign Up!
                    </h1>
                    <p sx={{fontFamily: "Quicksand, sans-serif"}}>
                      Alerady have an account?
                      <Link to="/login">Login here</Link>
                    </p>
                  </div>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{md: 6, xs: 12}}>
                      <Input
                        labelText="First Name"
                        {...formik.getFieldProps("FirstName")}
                        placeholder="Enter your first name"
                        error={
                          formik.touched.FirstName && formik.errors.FirstName
                        }
                      />
                      {renderError("FirstName")}
                    </Grid2>

                    <Grid2 size={{md: 6, xs: 12}}>
                      <Input
                        labelText="Last Name"
                        {...formik.getFieldProps("LastName")}
                        placeholder="Enter your last name"
                        error={
                          formik.touched.LastName && formik.errors.LastName
                        }
                      />
                      {renderError("LastName")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <PhoneInput
                        country={"in"}
                        value={formik.values.Phone}
                        onChange={(value) =>
                          formik.setFieldValue("Phone", value)
                        }
                        onBlur={() => formik.setFieldTouched("Phone", true)}
                        inputStyle={{width: "100%"}}
                      />
                      {formik.touched.Phone && formik.errors.Phone && (
                        <div
                          style={{
                            color: "#d32f2f",
                            fontSize: "12px",
                            margin: "10px 0px",
                          }}
                        >
                          {formik.errors.Phone}
                        </div>
                      )}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <Input
                        labelText="Email"
                        {...formik.getFieldProps("Email")}
                        placeholder="Enter your email"
                        error={formik.touched.Email && formik.errors.Email}
                      />
                      {renderError("Email")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <Input
                        labelText="Address"
                        {...formik.getFieldProps("Address")}
                        placeholder="Enter your address"
                        error={formik.touched.Address && formik.errors.Address}
                      />
                      {renderError("Address")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <InputPassword
                        labelText="Password"
                        {...formik.getFieldProps("Password")}
                        placeholder="Enter password"
                        error={
                          formik.touched.Password && formik.errors.Password
                        }
                      />
                      {renderError("Password")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <InputPassword
                        labelText="Confirm Password"
                        {...formik.getFieldProps("ConfirmPassword")}
                        placeholder="Confirm password"
                        error={
                          formik.touched.ConfirmPassword &&
                          formik.errors.ConfirmPassword
                        }
                      />
                      {renderError("ConfirmPassword")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...formik.getFieldProps("Term")}
                            checked={formik.values.Term}
                          />
                        }
                        label="I accept the terms and conditions"
                      />
                      {renderError("Term")}
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 12}}>
                      <Button style={{width: "100%"}} type="submit">
                        Submit
                      </Button>
                    </Grid2>
                  </Grid2>
                </form>
              </div>
            </Grid2>
            <Grid2
              size={{md: 12, lg: 6}}
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
              <div className="signup_right_side">
                <div className="signup_right_side_box">
                  <h6>Start managing your task faster & better!</h6>
                </div>
                <div className="signup_right_side_img">
                  <img src={signupimage} alt="" srcset="" />
                </div>
              </div>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </>
  );
};

export default Signup;
