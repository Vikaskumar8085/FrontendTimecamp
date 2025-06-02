import React, {useState} from "react";
import {Button, Grid2, Container} from "@mui/material";
import {ModeEditOutline} from "@mui/icons-material";
import profileimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import Input from "../../../common/Input/Input";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import InputPassword from "../../../common/InputPassword/InputPassword";
import TModal from "../../../common/Modal/TModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {useFormik} from "formik";
import PhoneInput from "react-phone-input-2";
import apiInstance from "../../../ApiInstance/apiInstance";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const ClientProfile = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(user);

  const dispatch = useDispatch();
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
    },
    onSubmit: async (values) => {
      console.log(values, "values");
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(setLoader(true));
      const response = await apiInstance.put(
        `/v2/client/update-client-profile/${isEdit?.Client_Id}`,
        formData
      );
      window.location.reload();
      console.log(response.data, "response");
      if (response?.data?.success) {
        dispatch(setLoader(false));
        window.location.reload();

        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        window.location.reload();
        toast.error(response?.data?.message);
      }
    },
  });
  return (
    <div>
      {" "}
      <div className="profile_card_wrapper">
        <div className="profile_card_box">
          <div className="profile_card_header">
            <img src={profileimage} alt="" />
            {/* header tags */}
            <div className="profile_header_tags">
              <img src={`${user?.Client_Photo}`} alt="" srcset="" />
              {/* <Button
                onClick={() => {
                  setIsOpen(true);
                  setIsEdit(user);
                }}
                startIcon={<ModeEditOutline />}
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                }}
              >
                Edit Profile
              </Button> */}
            </div>
            {/* header tags */}
          </div>
          {/* Profile Body */}
          <div className="profile_body">
            <div className="profile_body_head">
              {/* <h1>{user?.Client_Name}</h1> */}
            </div>

            <Grid2 container spacing={2}>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Name"}
                  paragraph={user?.Client_Name}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client UserName"}
                  paragraph={user?.Username}
                />
              </Grid2>

              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Company Name"}
                  paragraph={user?.Company_Name}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Email"}
                  paragraph={user?.Client_Email}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Phone"}
                  paragraph={user?.Client_Phone}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Address"}
                  paragraph={user?.Client_Address}
                />
              </Grid2>

              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Postal Code"}
                  paragraph={user.Client_Postal_Code}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Status"}
                  paragraph={user?.Client_Status}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Client Gst Number"}
                  paragraph={user?.GstNumber}
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
          <Container maxWidth="lg">
            <Grid2 container spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{md: 12, lg: 12, sm: 12, xs: 12}}>
                    <InputImageUpload
                      name="profileImage"
                      value={formik.values.profileImage}
                      onChange={formik.setFieldValue}
                    />
                    {formik.touched.profileImage &&
                      formik.errors.profileImage && (
                        <div style={{color: "red"}}>
                          {formik.errors.profileImage}
                        </div>
                      )}
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                    <Input
                      labelText={"Comapny Name"}
                      type="text"
                      placeholder={"Please Enter Company Name"}
                      {...formik.getFieldProps("Company_Name")}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                    <Input
                      labelText={"Client Name"}
                      type="text"
                      placeholder={"Please Enter Client Name"}
                      {...formik.getFieldProps("Client_Name")}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                    <Input
                      type="Email"
                      labelText={"Client Email"}
                      placeholder={"Please Enter Client Email"}
                      {...formik.getFieldProps("Client_Email")}
                    />
                  </Grid2>

                  {isEdit === null && (
                    <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                      <InputPassword
                        labelText={"Password"}
                        placeholder={"Please Enter Client Email"}
                        {...formik.getFieldProps("Password")}
                      />
                    </Grid2>
                  )}
                  <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                    <Input
                      labelText={"Address"}
                      placeholder={"Please Enter Client Address"}
                      {...formik.getFieldProps("Client_Address")}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
                    <Input
                      labelText={"Postal Code"}
                      type={"Number"}
                      placeholder={"Please Enter Client Postal Code"}
                      {...formik.getFieldProps("Client_Postal_Code")}
                    />
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 1.3}}>
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
                      inputStyle={{width: "100%"}}
                      country={"in"}
                      placeholder="Enter phone number"
                      value={formik.values.Client_Phone}
                      onChange={(value) =>
                        formik.setFieldValue("Client_Phone", value)
                      }
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div style={{color: "red"}}>{formik.errors.phone}</div>
                    )}
                  </Grid2>
                  <Grid2 size={{sm: 12, xs: 12, md: 6}}>
                    <Input
                      labelText={"Gst Number"}
                      placeholder={"Please Enter your Gst Number"}
                      {...formik.getFieldProps("GstNumber")}
                    />
                  </Grid2>

                  <Grid2 size={{sm: 12, xs: 12, md: 12}}>
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
            </Grid2>
          </Container>
        </TModal>
      )}
    </div>
  );
};

export default ClientProfile;
