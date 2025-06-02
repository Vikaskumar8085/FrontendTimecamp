import React, {useState} from "react";
import {Button, Container, Grid2} from "@mui/material";
import {ModeEditOutline} from "@mui/icons-material";
import profileimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import TModal from "../../../common/Modal/TModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Input from "../../../common/Input/Input";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import {useFormik} from "formik";
import PhoneInput from "react-phone-input-2";
const StaffProfile = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsEdit, setIsEdit] = useState(user);

  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit?.FirstName,
      LastName: IsEdit?.LastName,
      UserName: IsEdit?.UserName,
      Email: IsEdit?.Email,
      Address: IsEdit?.Address,
      Phone: IsEdit?.Phone,
      Start_Date: IsEdit?.Start_Date,
      End_Date: IsEdit?.End_Date,
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
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"UserName"}
                  paragraph={user?.UserName}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"FirstName"}
                  paragraph={user?.FirstName}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"LastName"}
                  paragraph={user?.LastName}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Email"}
                  paragraph={user?.Email}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Address"}
                  paragraph={user?.Address}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Phone"}
                  paragraph={user?.Phone}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Joining Date"}
                  paragraph={user?.Joining_Date}
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
              <form>
                <Grid2 size={{md: 12, sm: 12}}>
                  <InputImageUpload
                    name={"Photo"}
                    value={formik.values.Photo}
                    onChange={formik.setFieldValue}
                  />
                  {formik.touched.Photo && formik.errors.Photo ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.Photo}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{md: 12, sm: 12}}>
                  <Input
                    type={"text"}
                    value={formik.values.FirstName}
                    name={"FirstName"}
                    labelText={"First Name"}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.FirstName && formik.errors.FirstName ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.FirstName}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{md: 12, sm: 12}}>
                  <Input
                    type={"text"}
                    value={formik.values.LastName}
                    name={"LastName"}
                    labelText={"Last Name"}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.LastName && formik.errors.LastName ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.LastName}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{md: 12, sm: 12}}>
                  <Input
                    type={"text"}
                    value={formik.values.Email}
                    name={"Email"}
                    onChange={formik.handleChange}
                    labelText={"Email"}
                  />
                  {formik.touched.Email && formik.errors.Email ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.Email}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{md: 12, sm: 12}}>
                  <Input
                    type={"text"}
                    value={formik.values.Address}
                    name={"Address"}
                    onChange={formik.handleChange}
                    labelText={"Address"}
                  />
                  {formik.touched.Address && formik.errors.Address ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.Address}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{md: 12, sm: 12}}>
                  <Input
                    type={"date"}
                    value={formik.values.Joining_Date}
                    name={"Joining_Date"}
                    onChange={formik.handleChange}
                    labelText={"Joining_Date"}
                  />
                  {formik.touched.Joining_Date && formik.errors.Joining_Date ? (
                    <div style={{color: "red", font: "14px"}}>
                      {formik.errors.Joining_Date}
                    </div>
                  ) : null}
                </Grid2>
                <Grid2 size={{sm: 12, xs: 12, md: 12}}>
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
                    value={formik.values.Phone}
                    onChange={(value) => formik.setFieldValue("Phone", value)}
                  />
                  {formik.touched.Phone && formik.errors.Phone && (
                    <div style={{color: "red"}}>{formik.errors.Phone}</div>
                  )}
                </Grid2>
                <Grid2 size={{sm: 12, xs: 12, md: 12}}>
                  <Button
                    sx={{
                      background: "pink",
                      padding: "10px 0px",
                      margin: "10px 0px",
                      width: "100%",
                    }}
                  >
                    Submit
                  </Button>
                </Grid2>
              </form>
            </Grid2>
          </Container>
        </TModal>
      )}
    </div>
  );
};

export default StaffProfile;
