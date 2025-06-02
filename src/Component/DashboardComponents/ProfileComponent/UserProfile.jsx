import React, { useState } from "react";
import { Button, Container, Grid2 } from "@mui/material";
import { ModeEditOutline } from "@mui/icons-material";
import profileimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import TModal from "../../../common/Modal/TModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Input from "../../../common/Input/Input";
import { useFormik } from "formik";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";

import { setLoader } from "../../../redux/LoaderSlices/LoaderSlices";
import { updateprofileapicall } from "../../../ApiServices/AdminApiServices/Admin";
import { setAddprofile } from "../../../redux/User/UserSlice";
import toast from "react-hot-toast";

const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsEdit, setIsEdit] = useState(user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit?.FirstName,
      LastName: IsEdit.LastName,
      Email: IsEdit?.Email,
      Phone: IsEdit?.Phone,
      Photo: IsEdit?.Photo ?? null,
    },
    onSubmit: async (values) => {
      try {
        const formdata = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formdata.append(key, value);
        });

        dispatch(setLoader(true));
        const val = {
          id: IsEdit.user_id,
          payload: formdata,
        };
        const response = await updateprofileapicall(val);
        if (response?.success) {
          dispatch(setLoader(false));
          setIsOpen(false);
          toast.success(response?.message);
          window.location.reload();
          dispatch(setAddprofile(response?.result));
        } else {
          setIsOpen(false);
          toast.error(response?.message);
          dispatch(setLoader(false));
        }
      } catch (error) {
        console.log(error?.message);
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <>
      <div className="profile_card_wrapper">
        <div className="profile_card_box">
          <div className="profile_card_header">
            <img src={profileimage} alt="" />
            {/* header tags */}
            <div className="profile_header_tags">
              <img src={`${user?.Photo}`} alt="" srcset="" />
              <Button
                onClick={() => setIsOpen(!isOpen)}
                startIcon={<ModeEditOutline />}
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                }}
              >
                Edit Profile
              </Button>
            </div>
            {/* header tags */}
          </div>
          {/* Profile Body */}
          <div className="profile_body">
            <div className="profile_body_head">
              <h1>
                {user?.FirstName} {user?.LastName}
              </h1>
            </div>

            <Grid2 container spacing={2}>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Email"}
                  paragraph={user?.Email}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Role"}
                  paragraph={user?.Role}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                {user?.Term && (
                  <CardOne
                    icon={user.Term ? <EmailOutlinedIcon /> : null}
                    title={user.Term ? "Term" : null}
                    paragraph={user.Term ? "true" : "false"}
                  />
                )}
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Acitivity"}
                  paragraph={user.Activity ? "true" : "false"}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Block Status"}
                  paragraph={user.BlockStatus ? "unblock" : "blocked"}
                />
              </Grid2>
            </Grid2>
          </div>
          {/* Profile body */}
        </div>
      </div>

      {isOpen && (
        <TModal
          title={"Edit Profile"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Container maxWidth="md">
            <Grid2 container spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <InputImageUpload
                    name={"Photo"}
                    value={formik.values.Photo}
                    onChange={formik.setFieldValue}
                  />
                </Grid2>
                <Grid2 size={{ md: 12, sm: 12 }}>
                  <Input
                    type={"text"}
                    placeholder={"Please Enter your FirstName"}
                    labelText={"FirstName"}
                    {...formik.getFieldProps("FirstName")}
                  />
                  {formik.touched.FirstName && formik.errors.FirstName && (
                    <div>{formik.errors.FirstName}</div>
                  )}
                </Grid2>
                <Grid2 size={{ md: 12, sm: 12, lg: 12 }}>
                  <Input
                    type={"text"}
                    placeholder={"Please Enter your LastName"}
                    labelText={"LastName"}
                    {...formik.getFieldProps("LastName")}
                  />
                  {formik.touched.LastName && formik.errors.LastName && (
                    <div>{formik.errors.LastName}</div>
                  )}
                </Grid2>
                <Grid2 size={{ md: 12, sm: 12, lg: 12 }}>
                  <Input
                    type={"Email"}
                    placeholder={"Please Enter your Email"}
                    labelText={"Email"}
                    {...formik.getFieldProps("Email")}
                  />
                  {formik.touched.Email && formik.errors.Email && (
                    <div>{formik.errors.Email}</div>
                  )}
                </Grid2>
                {IsEdit.Phone && (
                  <Grid2 size={{ md: 12, sm: 12 }}>
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
                      value={formik.values.Phone}
                      onChange={(value) => formik.setFieldValue("Phone", value)}
                    />
                    {formik.touched.Phone && formik.errors.Phone && (
                      <div style={{ color: "red" }}>{formik.errors.Phone}</div>
                    )}
                  </Grid2>
                )}
                <Grid2 size={{ md: 12, sm: 12, lg: 12 }}>
                  <Button
                    type="submit"
                    sx={{ background: "yellow", width: "100%" }}
                  >
                    Submit
                  </Button>
                </Grid2>
              </form>
            </Grid2>
          </Container>
        </TModal>
      )}
    </>
  );
};

export default UserProfile;
