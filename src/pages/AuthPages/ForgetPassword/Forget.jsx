import React, {useState} from "react";
import {Grid2} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";
import timecamplogo from "../../../assets/auth/Screenshot from 2025-04-22 17-26-29.png";
import signupimage from "../../../assets/auth/signupImage-removebg-preview.png";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input/Input";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
const Forget = () => {
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (value) => {
      try {
        console.log(value, "value");
        const response = await apiInstance.post(
          "/v1/user/forget-password",
          value
        );

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          formik.resetForm();
        } else {
          toast.error(response?.data?.message);
          formik.resetForm();
        }
      } catch (error) {
        formik.resetForm();
        toast.error(error?.response?.data?.message || "something went wrong");
      }
    },
  });

  return (
    <>
      <div className="forget_password_container">
        <div className="forget_password_bg_logo">
          <img src={timecamplogo} alt="no-image" srcset="" />
        </div>
        <div className="forget_password_box">
          <Grid2 container spacing={2}>
            <Grid2 size={{sx: 12, sm: 12, md: 12, lg: 6}}>
              <div className="forget_password_left_side">
                <form onSubmit={formik.handleSubmit}>
                  <div className="forget_left_side_title">
                    <h1 sx={{fontFamily: "Quicksand, sans-serif"}}>
                      {" "}
                      Forget Password!
                    </h1>
                    {/* <p sx={{fontFamily: "Quicksand, sans-serif"}}>
                      Don’t have an account Yet?
                      <Link to="/signup">Sign up here</Link>
                    </p> */}
                  </div>
                  <Grid2 container spacing={1} justifyContent={"center"}>
                    <Grid2 item size={{md: 12, lg: 12, sm: 12, xs: 12}}>
                      <Input
                        type={"email"}
                        labelText={" Email or User Name"}
                        placeholder={"Please enter your UserName & Email"}
                        {...formik.getFieldProps("Email")}
                      />
                      {formik.errors.Email && formik.touched.Email && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {formik.errors.Email}
                        </div>
                      )}
                    </Grid2>

                    <Grid2 item size={{md: 12, lg: 12, sm: 12, xs: 12}}>
                      <Button style={{width: "100%"}} type={"submit"}>
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
              <div className="forget_password_right_side">
                <div className="forget_password_right_side_box">
                  <h6>Start managing your task faster & better!</h6>
                </div>
                <div className="forget_password_right_side_img">
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

export default Forget;
{
  /* <Container maxWidth="sm">
<Box sx={{mt: 8, textAlign: "center"}}>
  <Typography variant="h5" gutterBottom>
    Forgot Password
  </Typography>
  <Typography variant="body2" color="textSecondary">
    Enter your email address and we'll send you a link to
    reset your password.
  </Typography>
  {error && <Alert severity="error">{error}</Alert>}
  {success && <Alert severity="success">{success}</Alert>}
  <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
    <TextField
      fullWidth
      label="Email Address"
      variant="outlined"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <Button
      type="submit"
      variant="contained"
      sx={{mt: 2}}
      fullWidth
    >
      Send Reset Link
    </Button>
  </Box>
</Box>
</Container> */
}
