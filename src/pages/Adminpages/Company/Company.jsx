import React, {useCallback, useEffect, useState} from "react";
import {useFormik} from "formik";
import {Button, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./company.scss";
import {
  createcompanyapicall,
  fetchcompanyapicall,
} from "../../../ApiServices/Companyapiservices";
import TModal from "../../../common/Modal/TModal";
import {useNavigate} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import CompanyTable from "../../../Component/Companycomponents/CompanyTable";
import CompanyEditForm from "../../../Component/Companycomponents/CompanyEditForm";
import toast from "react-hot-toast";
import Input from "../../../common/Input/Input";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

const CompanyForm = ({handlesubmit}) => {
  const validationSchema = Yup.object().shape({
    Company_Logo: Yup.mixed().required("Company logo is required"),
    Company_Name: Yup.string().required("Company name is required"),
    Person_Name: Yup.string().required("Person name is required"),
    Person_Email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    Person_Phones: Yup.string().required("Person phone number is required"),
    Company_Email: Yup.string()
      .email("Invalid email")
      .required("Company email is required"),
    Address: Yup.string().required("Address is required"),
    Postal_Code: Yup.number()
      .typeError("Postal code must be a number")
      .required("Postal code is required"),
    Phone: Yup.string().required("Phone number is required"),
    Employee_No: Yup.number()
      .typeError("Employee number must be a number")
      .required("Employee number is required"),
    Established_date: Yup.date().required("Established date is required"),
    CompanyWesite: Yup.string()
      .url("Invalid URL")
      .required("Company website is required"),
    Tex_Number: Yup.string().required("Tax number is required"),
  });

  const formik = useFormik({
    initialValues: {
      Company_Logo: null,
      Company_Name: "",
      Person_Name: "",
      Person_Email: "",
      Person_Phones: "",
      Company_Email: "",
      Address: "",
      Postal_Code: "",
      Phone: "",
      Employee_No: "",
      Established_date: "",
      CompanyWesite: "",
      Tex_Number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      const formData = new FormData();

      // Append text fields
      formData.append("Company_Name", values.Company_Name);
      formData.append("Person_Name", values.Person_Name);
      formData.append("Person_Email", values.Person_Email);
      formData.append("Person_Phones", values.Person_Phones);
      formData.append("Company_Email", values.Company_Email);
      formData.append("Address", values.Address);
      formData.append("Postal_Code", values.Postal_Code.toString());
      formData.append("Phone", values.Phone);
      formData.append("Employee_No", values.Employee_No.toString());
      formData.append("Established_date", values.Established_date);
      formData.append("CompanyWesite", values.CompanyWesite);
      formData.append("Tex_Number", values.Tex_Number);

      if (values.Company_Logo) {
        formData.append("Company_Logo", values.Company_Logo); // File
      }

      console.log("Submitting FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1], "values");
      }

      handlesubmit(formData);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{sm: 12, xs: 12}}>
            <InputImageUpload
              name="Company_Logo"
              value={formik.values.Company_Logo}
              onChange={formik.setFieldValue}
            />
            {formik.touched.Company_Logo && formik.errors.Company_Logo && (
              <div style={{color: "red", font: "14px"}}>
                {formik.errors.Company_Logo}
              </div>
            )}
          </Grid>

          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Company Name"
              {...formik.getFieldProps("Company_Name")}
              value={formik.values.Company_Name}
              placeholder={"Please Enter Company Name"}
            />
            {formik.touched.Company_Name && formik.errors.Company_Name && (
              <div style={{font: "14px", color: "red"}}>
                {formik.errors?.Company_Name}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Person Name"
              {...formik.getFieldProps("Person_Name")}
              value={formik.values.Person_Name}
              placeholder={"Please Enter Person Name"}
            />
            {formik.touched.Person_Name && formik.errors.Person_Name && (
              <div style={{font: "14px", color: "red"}}>
                {formik.errors?.Person_Name}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Person Email"
              {...formik.getFieldProps("Person_Email")}
              value={formik.values.Person_Email}
              placeholder={"Please Enter Person Email"}
            />
            {formik.touched.Person_Email && formik.errors.Person_Email && (
              <div style={{font: "14px", color: "red"}}>
                {formik.errors?.Person_Email}
              </div>
            )}
          </Grid>

          <Grid size={{sm: 12, xs: 12, md: 6}} sx={{mt: 1.3}}>
            <label
              htmlFor="phone-input"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#86919b",
                fontWeight: "500",
              }}
            >
              Person Phone Number
            </label>

            <PhoneInput
              inputStyle={{width: "100%"}}
              country={"in"}
              placeholder="Enter phone number"
              value={formik.values.Client_Phone}
              onChange={(value) => formik.setFieldValue("Person_Phones", value)}
            />
            {formik.touched.Person_Phones && formik.errors.Person_Phones && (
              <div style={{color: "red"}}>{formik.errors.Person_Phones}</div>
            )}
          </Grid>

          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Company Email"
              {...formik.getFieldProps("Company_Email")}
              placeholder={"Please Enter Company Email"}
              type={"email"}
              value={formik.values.Company_Email}
            />
            {formik.touched.Company_Email && formik.errors.Company_Email && (
              <div style={{font: "14px", color: "red"}}>
                {formik.errors.Company_Email}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Address"
              placeholder={"Please Enter Address"}
              value={formik.values.Address}
              {...formik.getFieldProps("Address")}
            />
            {formik.touched.Address && formik.errors.Address && (
              <div style={{font: "14px", color: "red"}}>
                {formik.errors.Address}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Postal Code"
              {...formik.getFieldProps("Postal_Code")}
              placeholder={"Please Enter Postal Code"}
              type={"number"}
            />
            {formik.touched.Postal_Code && formik.errors.Postal_Code && (
              <div style={{color: "red", font: "14px"}}>
                {formik.errors.Postal_Code}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6}} sx={{mt: 1.3}}>
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
          </Grid>

          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Employee Number"
              type="number"
              placeholder={"Please Enter Employee Number"}
              {...formik.getFieldProps("Employee_No")}
            />
            {formik.touched.Employee_No && formik.errors.Employee_No && (
              <div style={{color: "red", font: "14px"}}>
                {formik.errors.Employee_No}
              </div>
            )}{" "}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Established Date"
              type="date"
              InputLabelProps={{shrink: true}}
              {...formik.getFieldProps("Established_date")}
              value={formik.values.Established_date}
            />
            {formik.touched.Established_date &&
              formik.errors.Established_date && (
                <div style={{color: "red", font: "14px"}}>
                  {formik.errors.Established_date}
                </div>
              )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Company Website"
              {...formik.getFieldProps("CompanyWesite")}
              placeholder={"Please Enter Company Website"}
              type={"text"}
              value={formik.values.CompanyWesite}
            />
            {formik.touched.CompanyWesite && formik.errors.CompanyWesite && (
              <div style={{color: "red", font: "14px"}}>
                {formik.errors.CompanyWesite}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6, lg: 6}}>
            <Input
              labelText="Tax Number"
              name={"Tex_Number"}
              {...formik.getFieldProps("Tex_Number")}
              placeholder={"Please Enter Tax Number"}
              type={"text"}
              value={formik.values.Tex_Number}
            />
            {formik.touched.Tex_Number && formik.errors.Tex_Number && (
              <div style={{color: "red", font: "14px"}}>
                {formik.errors.Tex_Number}
              </div>
            )}
          </Grid>
          <Grid size={{sm: 12, xs: 12}}>
            <Button
              sx={{
                background: "#6560f0",
                padding: "8px 10px",
                width: "100%",
                color: "white",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const Company = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(null);
  const [iscompanydata, setIscompanydata] = useState({});
  const [isId, setIsId] = useState(null);

  const getcompany = useCallback(async () => {
    try {
      const response = await fetchcompanyapicall();
      if (response.success) {
        setIscompanydata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  // create company
  const handlesubmit = async (value) => {
    try {
      const response = await createcompanyapicall(value);
      if (response.success) {
        toast.success(response?.message);
        navigate("/dashboard");
      } else {
        navigate("/company");
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getcompany();
    // localStorage.setItem("company", parseInt(iscompanydata.Company_Id));
  }, [getcompany]);
  return iscompanydata.Company_Id > 0 ? (
    <LayoutDesign>
      <BreadCrumb pageName="Company" />
      <CompanyTable
        setIsOpen={setIsOpen}
        setIsEdit={setIsEdit}
        company={iscompanydata}
        setIsId={setIsId}
      />

      {IsOpen && (
        <TModal
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
            isEdit(false);
            isId = null;
          }}
          title="Edit Company"
        >
          <CompanyEditForm
            getcompany={getcompany}
            isId={isId}
            setIsOpen={setIsOpen}
            isEdit={isEdit}
          />
        </TModal>
      )}
    </LayoutDesign>
  ) : (
    <>
      {" "}
      <div className="company-container">
        <button
          className="btn-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <PowerSettingsNewIcon />
        </button>
        <div className="comapny_form">
          <CompanyForm handlesubmit={handlesubmit} />
        </div>
      </div>
    </>
  );
};

export default Company;
