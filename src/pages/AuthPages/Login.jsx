import React, {useEffect} from "react";
import {Container, Grid2} from "@mui/material";
import {useFormik} from "formik";
import {loginapicall} from "../../ApiServices/Authapiservices";
import {useGoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {GoogleLoginAuth} from "../../ApiServices/UserApiServices/User";
import {Link} from "react-router-dom";
import Button from "../../common/Button/Button";
import toast from "react-hot-toast";
import Input from "../../common/Input/Input";
import InputPassword from "../../common/InputPassword/InputPassword";
import signupimage from "../../assets/auth/signupImage-removebg-preview.png";
import timecamplogo from "../../assets/auth/Screenshot from 2025-04-22 17-26-29.png";
const validate = (values) => {
  const errors = {};

  if (!values.Email) {
    errors.Email = "Email is required";
  }
  if (!values.Password) {
    errors.Password = "Password is required";
  } else if (values.Password.length < 6) {
    errors.Password = "Password must be at least 6 characters";
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  // at us.
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await loginapicall(values);
        console.log(response, "login value");
        if (response.success) {
          dispatch(setLoader(false));
          window.location.href = response.redirectUrl;
          localStorage.setItem("token", JSON.stringify(response.token));
          toast.success(response.message);
          formik.resetForm();
        } else {
          dispatch(setLoader(false));
          toast.error(response.message);
          formik.resetForm();
        }
      } catch (error) {
        formik.resetForm();
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

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setLoader(true));
      const response = await GoogleLoginAuth(tokenResponse);
      console.log(response, "afsdfasdfjlsadfj");
      if (response.success) {
        dispatch(setLoader(false));
        localStorage.setItem("token", JSON.stringify(response.result));
        window.location.href = response.redirectUrl;
      }
    },
  });

  useEffect(() => {
    redirectfunc();
  }, [0]);

  return (
    <>
      <div className="login_wrapper">
        <div className="login_wrapper_logo">
          <img src={timecamplogo} alt="no-image" srcset="" />
        </div>
        <div className="login_box">
          <Grid2 container justifyContent={"center"}>
            <Grid2 size={{md: 12, lg: 6}}>
              <div className="login_left_side">
                <form onSubmit={formik.handleSubmit}>
                  <div className="login_left_side_title">
                    <h1 sx={{fontFamily: "Quicksand, sans-serif"}}> Login!</h1>
                    <p sx={{fontFamily: "Quicksand, sans-serif"}}>
                      Don’t have an account Yet?
                      <Link to="/signup">Sign up here</Link>
                    </p>
                  </div>
                  <div className="mb-3">
                    <Input
                      type="text"
                      labelText="Email or User Name"
                      id="Email"
                      {...formik.getFieldProps("Email")}
                      placeholder={"Enter email"}
                    />
                    <p style={{color: "red"}}>
                      {formik.touched.Email && formik.errors.Email ? (
                        <div>{formik.errors.Email}</div>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-3">
                    <InputPassword
                      type="password"
                      labelText="Password"
                      id="Password"
                      placeholder={"Enter your password"}
                      {...formik.getFieldProps("Password")}
                    />
                    <p style={{color: "red"}}>
                      {formik.touched.Password && formik.errors.Password ? (
                        <div>{formik.errors.Password}</div>
                      ) : null}
                    </p>
                  </div>
                  <div className="mb-3">
                    <Button type={"submit"} style={{width: "100%"}}>
                      Submit
                    </Button>
                  </div>

                  <br />
                  <Link to="/forget-password">
                    <strong>Forget password </strong>
                  </Link>
                  <br />
                  <div className="mb-3">
                    <Button onclick={() => login()} className="google-btn">
                      <img
                        src="https://www.google.com/images/icons/product/search-32.gif"
                        alt="Google logo"
                        className="google-icon"
                      />
                      <span>Sign in with Google</span>
                    </Button>
                  </div>
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
              <div className="login_right_side">
                <div className="login_right_side_box">
                  <h6>Start managing your task faster & better!</h6>
                </div>
                <div className="login_right_side_img">
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

export default Login;
