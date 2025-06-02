import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  ListItemText,
  Grid,
  Typography,
  Button,
  Grid2,
} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import {fetchdesignationapicall} from "../../../ApiServices/MasterApiServices/Designation";
import toast from "react-hot-toast";
import {fetchstaffmemberapicall} from "../../../ApiServices/AdminApiServices/Admin";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
import Input from "../../../common/Input/Input";
import PhoneInput from "react-phone-input-2";
import InputSelect from "../../../common/InputSelect/InputSelect";
import InputCheckboxMulti from "../../../common/InputMultiSelect/InputCheckboxMulti";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const ContractorForm = ({handleSubmit, IsEdit, udpatecontractorfunc}) => {
  // console.log(IsEdit.Photos[0], "IsEdit");
  const [designations, setDesignations] = useState([]);
  const [Ismanagerid, setIsmanagerid] = useState([]);

  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit?.FirstName || "",
      LastName: IsEdit?.LastName || "",
      Email: IsEdit?.Email || "",
      Address: IsEdit?.Address || "",
      Phone: IsEdit?.Phone || "",
      DesignationId: IsEdit?.DesignationId || "",
      Backlog_Entries: IsEdit?.Backlog_Entries || "",
      Socail_Links: IsEdit?.Socail_Links || "",
      Permission: IsEdit?.Permission || false,
      ManagerId: IsEdit?.ManagerId || "",
      Joining_Date: IsEdit?.Joining_Date || "",
      Contractor_Company: IsEdit?.Contractor_Company || "",
      profileImage: IsEdit?.Photos[0] || null,
      Hourly_Rate: IsEdit?.Hourly_Rate || "",
      Supervisor: IsEdit?.Supervisor || "",
      Cost: IsEdit?.Rate || "",
      Unit: IsEdit?.Unit || "",
      Currency: IsEdit?.Currency || "",
      days: [],
    },

    onSubmit: async (values) => {
      console.log(values, "values");
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (IsEdit) {
        udpatecontractorfunc(formData);
        formik.resetForm();
      } else {
        handleSubmit(formData);
        formik.resetForm();
        s;
      }
    },
  });

  const getDesignations = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response.success) {
        setDesignations(response.result);
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  const getstaffmembersfunc = async () => {
    try {
      const response = await fetchstaffmemberapicall();
      if (response.success) {
        setIsmanagerid(response.result);
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    getDesignations();
    getstaffmembersfunc();
  }, []);

  const weekOptions = [
    {value: "Sunday", label: "Sunday"},
    {value: "Monday", label: "Monday"},
    {value: "Tuesday", label: "Tuesday"},
    {value: "Wednesday", label: "Wednesday"},
    {value: "Thursday", label: "Thursday"},
    {value: "Friday", label: "Friday"},
    {value: "Saturday", label: "Saturday"},
  ];
  return (
    <Container maxWidth="md">
      <Box sx={{p: 1}}>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={{md: 12, lg: 12, sm: 12, xs: 12}}>
              <InputImageUpload
                name="profileImage"
                value={formik.values.profileImage}
                onChange={formik.setFieldValue}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
              <Input
                labelText="FirstName"
                placeholder="Please Enter Your First Name"
                {...formik.getFieldProps("FirstName")}
                type={"text"}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
              <Input
                labelText="LastName"
                placeholder="Please Enter Your First Name"
                type={"text"}
                {...formik.getFieldProps("LastName")}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12, xs: 12}}>
              <Input
                labelText="Email"
                type={"Email"}
                placeholder="Please Enter Your Email"
                {...formik.getFieldProps("Email")}
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
                value={formik.values.Phone}
                onChange={(value) => formik.setFieldValue("Phone", value)}
                style={{width: "100%", padding: "1px"}}
              />
            </Grid2>

            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Address"}
                placeholder={"Please Enter your Address"}
                value={formik.values.Address}
                {...formik.getFieldProps("Address")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Joining Date"}
                value={formik.values.Joining_Date}
                type={"date"}
                placeholder={"Please Enter your Joining Date"}
                {...formik.getFieldProps("Joining_Date")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                value={formik.values.Socail_Links}
                labelText={"Skype Id"}
                placeholder={"Please Enter your skypeId"}
                {...formik.getFieldProps("Socail_Links")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"BackLog Enteries"}
                placeholder={"Please Enter your BackLog Enteries"}
                {...formik.getFieldProps("Backlog_Entries")}
                value={formik.values.Backlog_Entries}
                type={"Number"}
              />
            </Grid2>

            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <InputSelect
                name="DesignationId"
                placeholder="--- select contractor designation ---"
                value={formik.values.DesignationId}
                onChange={formik.handleChange}
                labelText={"Designation"}
                options={designations.map((item) => ({
                  value: item.Designation_Id,
                  label: item.Designation_Name,
                }))}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <InputSelect
                // value={formik.values.ManagerId}
                // onChange={formik.handleChange} // Correct: pass the handler
                // onBlur={formik.handleBlur}
                // name="ManagerId"
                // labelText={"Select Manager"}
                // placeholder="--- select contractor manager---"
                // options={Ismanagerid.filter(
                //   (item) => item.Role === "Employee"
                // ).map((item) => ({
                //   value: item.staff_Id,
                //   label: item.FirstName,
                // }))}
                value={formik.values.ManagerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="ManagerId"
                labelText={"Select Manager"}
                placeholder="--- select contractor manager---"
                options={Ismanagerid.filter(
                  (item) => item.Role === "Employee"
                ).map((item) => ({
                  value: item.staff_Id,
                  label: item.FirstName,
                }))}
              />
            </Grid2>

            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Currency"}
                type={"text"}
                placeholder={"Please Enter Currency"}
                {...formik.getFieldProps("Currency")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Cost"}
                type={"text"}
                placeholder={"Please Enter Cost"}
                {...formik.getFieldProps("Cost")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Unit"}
                type={"Number"}
                placeholder={"Please Enter Unit"}
                {...formik.getFieldProps("Unit")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Company Name"}
                type={"text"}
                placeholder={"Please Enter Company Name"}
                {...formik.getFieldProps("Contractor_Company")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Hourly Rate"}
                type={"text"}
                placeholder={"Please Enter Hourly Rate"}
                {...formik.getFieldProps("Hourly_Rate")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}}>
              <Input
                labelText={"Supervisore"}
                type={"text"}
                placeholder={"Please Enter Supervisore"}
                {...formik.getFieldProps("Supervisore")}
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 4}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.Permission}
                    onChange={formik.handleChange}
                    name="Permission"
                  />
                }
                label="Project Create Permission"
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 12}}>
              <InputCheckboxMulti
                labelText="Select Week Off Days"
                options={weekOptions}
                selected={formik.values.days}
                onChange={(newSelected) =>
                  formik.setFieldValue("days", newSelected)
                }
              />
            </Grid2>
            <Grid2 size={{sm: 12, xs: 12, md: 12}}>
              <Button
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
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

export default ContractorForm;
{
  /* <Container maxWidth="md">
<Box sx={{mt: 4, p: 2}}>
  <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          placeholder="First Name"
          {...formik.getFieldProps("FirstName")}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          placeholder="Last Name"
          {...formik.getFieldProps("LastName")}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          placeholder="Email"
          {...formik.getFieldProps("Email")}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Phone"
          placeholder="Phone"
          fullWidth
          {...formik.getFieldProps("Phone")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Address"
          placeholder="Address"
          fullWidth
          {...formik.getFieldProps("Address")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Joining Date"
          type="date"
          fullWidth
          InputLabelProps={{shrink: true}}
          {...formik.getFieldProps("Joining_Date")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Select Designation</InputLabel>
          <Select
            {...formik.getFieldProps("DesignationId")}
            value={formik.values.DesignationId}
            onChange={formik.handleChange}
          >
            {designations.map((item) => (
              <MenuItem
                key={item.Designation_Id}
                value={item.Designation_Id}
              >
                {item.Designation_Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Select Manager</InputLabel>
          <Select
            {...formik.getFieldProps("ManagerId")}
            value={formik.values.ManagerId}
            onChange={formik.handleChange}
          >
            {Ismanagerid.filter((item) => {
              return item.Role !== "Contractor";
            }).map((item) => (
              <MenuItem key={item.staff_Id} value={item.staff_Id}>
                {item.FirstName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Skype ID"
          placeholder="Enter your Skype ID or Social Media link"
          fullWidth
          {...formik.getFieldProps("Socail_Links")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Currency"
          fullWidth
          {...formik.getFieldProps("Currency")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="unit"
          fullWidth
          {...formik.getFieldProps("unit")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Cost"
          fullWidth
          {...formik.getFieldProps("Cost")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Company Name "
          placeholder="Enter your Company Name"
          fullWidth
          {...formik.getFieldProps("Contractor_Company")}
        />
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Hourly Rate "
          placeholder="Enter your Hourly Rate"
          fullWidth
          {...formik.getFieldProps("Hourly_Rate")}
        />
      </Grid>{" "}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Supervisor"
          placeholder="Enter your Supervisor"
          fullWidth
          {...formik.getFieldProps("Supervisor")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Backlog Entries"
          fullWidth
          {...formik.getFieldProps("Backlog_Entries")}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="days-label">Select Week off Days</InputLabel>
          <Select
            labelId="days-label"
            id="days"
            name="days"
            multiple
            value={formik.values.days}
            onChange={formik.handleChange}
            input={<OutlinedInput label="Select Days" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox
                  checked={formik.values.days.indexOf(day) > -1}
                />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.Permission}
              onChange={formik.handleChange}
              name="Permission"
            />
          }
          label="Project Create Permission"
        />
      </Grid>
      <Grid item xs={12}>
        <InputFileupload
          type="file"
          title="Upload Profile Picture"
          paragraph={"Please upload your Profile Picture "}
          accept="image/png, image/jpeg, image/jpg"
          onChange={(event) =>
            formik.setFieldValue("Profile", event.currentTarget.files[0])
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          sx={{
            background: "#6560f0",
            padding: "8px 10px",
            margin: "10px 0px",
            color: "white",
            "&:hover": {background: "#6560f0"},
          }}
        >
          {IsEdit ? "update  " : " Submit"}
        </Button>
      </Grid>
    </Grid>
  </form>
</Box>
</Container> */
}
