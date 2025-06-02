import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  FormControlLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  AddBox,
  AddCircle,
  AddCircleOutline,
  RemoveCircleOutline,
  RemoveCircle,
} from "@mui/icons-material";
import {fetchclientapicall} from "../../../ApiServices/AdminApiServices/Client/index";
import {
  createprojectapicall,
  fetchstaffmembersapicall,
} from "../../../ApiServices/ProjectApiServices";
import {fetchroleapicall} from "../../../ApiServices/MasterApiServices/Roles";
import Input from "../../../common/Input/Input";
import InputSelect from "../../../common/InputSelect/InputSelect";
import moment from "moment";

const ProjectForm = ({handleSubmit, IsEdit, UpdateHandleProject}) => {
  const [clients, setClients] = useState([]);
  const [IsStaffdata, setIsstaffdata] = useState([]);
  const [IsRoledata, setIsRoledata] = useState([]);
  const getclientdata = async () => {
    try {
      const response = await fetchclientapicall();
      if (response.success) {
        setClients(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  console.log(IsEdit, "isedit");
  const getroledata = async () => {
    try {
      const response = await fetchroleapicall();
      if (response.success) {
        setIsRoledata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const getstaffdata = async () => {
    try {
      const response = await fetchstaffmembersapicall();
      if (response.success) {
        setIsstaffdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Project_Name: IsEdit?.Project_Name ?? "",
      clientId: IsEdit?.clientId ?? "",
      Project_Type: IsEdit?.Project_Type ?? "",
      Start_Date: IsEdit?.Start_Date
        ? moment(IsEdit.Start_Date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "",
      End_Date: IsEdit?.End_Date
        ? moment(IsEdit.End_Date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "",
      currency: IsEdit?.currency ?? "",
      Project_Hours: IsEdit?.Project_Hours ?? "",
      bucket: IsEdit?.bucket
        ? IsEdit.bucket.map((item) => ({
            bucketHourly: item.bucketHourly || "",
            bucketHourlyRate: item.bucketHourlyRate || "",
          }))
        : [{bucketHourly: "", bucketHourlyRate: ""}],

      roleProjectMangare:
        Array.isArray(IsEdit?.roleProjectMangare) &&
        IsEdit.roleProjectMangare.length > 0
          ? IsEdit.roleProjectMangare.map((resource) => ({
              RRId: resource?.RRId ?? "",
              RId: resource?.RId ?? "",
              billable: resource?.billable ?? false,
              Unit: resource?.Unit ?? "",
              Rate: resource?.Rate ?? "",
              IsProjectManager: resource?.IsProjectManager ?? false,
              Engagement_Ratio: resource?.Engagement_Ratio ?? "",
            }))
          : [
              {
                RRId: "",
                RId: "",
                billable: false,
                Unit: "",
                Rate: "",
                Engagement_Ratio: "",
                IsProjectManager: false,
              },
            ],

      roleResources:
        Array.isArray(IsEdit?.roleResources) && IsEdit.roleResources.length > 0
          ? IsEdit.roleResources.map((resource) => ({
              RRId: resource?.RRId ?? "",
              RId: resource?.RId ?? "",
              billable: resource?.billable ?? false,
              Unit: resource?.Unit ?? "",
              Rate: resource?.Rate ?? "",
              Engagement_Ratio: resource?.Engagement_Ratio ?? "",
            }))
          : [
              {
                RRId: "",
                RId: "",
                billable: false,
                Unit: "",
                Rate: "",
                Engagement_Ratio: "",
              },
            ],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (IsEdit === null) {
        handleSubmit(values);
        formik.resetForm();
      } else {
        UpdateHandleProject(values);
        formik.resetForm();
      }
    },
  });

  const addRoleResource = () => {
    formik.setValues({
      ...formik.values,
      roleResources: [
        ...formik.values.roleResources,
        {
          RRId: "",
          RId: "",
          billable: false,
          Unit: "",
          Rate: "",
          Engagement_Ratio: "",
        },
      ],
    });
  };

  // add role Prooject Managare
  const addroleProjectMangare = () => {
    formik.setValues({
      ...formik.values,
      roleProjectMangare: [
        ...formik.values.roleProjectMangare,
        {
          RRId: "",
          RId: "",
          billable: false,
          IsProjectManager: true,
          Unit: "",
          Rate: "",
          Engagement_Ratio: "",
        },
      ],
    });
  };
  // add role Project Managare
  const removeRoleResource = (index) => {
    const updatedRoles = [...formik.values.roleResources];
    updatedRoles.splice(index, 1);
    formik.setValues({...formik.values, roleResources: updatedRoles});
  };
  // remove Project Manager Resource
  const removeProjectmanagerResource = (index) => {
    const updatedRoles = [...formik.values.roleProjectMangare];
    updatedRoles.splice(index, 1);
    formik.setValues({...formik.values, roleProjectMangare: updatedRoles});
  };
  // add Multibucket
  const addMultiBucket = () => {
    const updatedBuckets = [
      ...formik.values.bucket,
      {bucketHourly: "", bucketHourlyRate: ""},
    ];
    formik.setFieldValue("bucket", updatedBuckets);
  };
  // add Multibucket
  // remove Bucket
  const removeBucket = (index) => {
    const updatedBucket = [...formik.values.bucket];
    updatedBucket.splice(index, 1);
    formik.setFieldValue("bucket", updatedBucket);
  };
  // remove Bucket

  useEffect(() => {
    getclientdata();
    getstaffdata();
    getroledata();
  }, [0]);

  return (
    <Container maxWidth="lg">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <Input
              labelText="Project Name"
              name="Project_Name"
              value={formik.values.Project_Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={"Please Enter Your Project Name"}
            />
          </Grid>
          <Grid size={{sm: 12, md: 6, xs: 12}}>
            <InputSelect
              name={"clientId"}
              labelText={"Select Client"}
              value={formik.values.clientId}
              onChange={formik.handleChange}
              placeholder="---please select client ---"
              options={clients?.map((item) => ({
                value: item?.Client_Id,
                label: item.Client_Name,
              }))}
            />
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <Input
              type="date"
              labelText="Start Date"
              name="Start_Date"
              value={formik.values.Start_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6}}>
            <Input
              type="date"
              labelText="End Date"
              name="End_Date"
              value={formik.values.End_Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid size={{sm: 12, xs: 12, md: 6}} sx={{mt: 1}}>
            <InputSelect
              name={"currency"}
              labelText={"Select Currency"}
              value={formik.values.currency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="--- please select currency ---"
              options={[
                {value: "US Dollor", label: "US Dollor"},
                {value: "Euro", label: "Euro"},
                {value: "British Pound", label: "British Pound"},
                {value: "INR", label: "INR"},
              ]}
            />
          </Grid>

          <Grid size={{sm: 12, xs: 12, md: 12}}>
            <InputSelect
              name={"Project_Type"}
              labelText={"Select Project Type"}
              value={formik.values.Project_Type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="--- please select Project Type ---"
              options={[
                {value: "Fixed", label: "Fixed"},
                {value: "Bucket", label: "Bucket"},
                {value: "Full Time Resources", label: "Full Time Resources"},
                {value: "Time and Material", label: "Time and Material"},
              ]}
            />
          </Grid>
          {formik.values.Project_Type === "Bucket" && (
            <>
              {formik.values.bucket.map((item, index) => {
                return (
                  <>
                    <Grid size={{sm: 12, xs: 12, md: 6}}>
                      <Input
                        labelText="Backet Hourly"
                        placeholder={"please Enter your Bucket Duration"}
                        name={`bucket[${index}].bucketHourly`}
                        type="number"
                        value={item.bucketHourly}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid size={{sm: 12, xs: 12, md: 6}}>
                      <Input
                        labelText="Bucket Hourly Rate"
                        id={`bucket-${index}-rate`}
                        name={`bucket[${index}].bucketHourlyRate`}
                        type="number"
                        placeholder="Please enter your bucket rate"
                        value={item.bucketHourlyRate}
                        onChange={formik.handleChange}
                      />
                    </Grid>

                    <Grid size={{sm: 12, xs: 12, md: 12}}>
                      <Button color="info" onClick={addMultiBucket}>
                        <AddCircle sx={{color: "green"}} />
                      </Button>
                      {formik.values.bucket.length > 1 && (
                        <Button
                          color="danger"
                          onClick={() => removeBucket(index)}
                        >
                          <RemoveCircle sx={{color: "red"}} />
                        </Button>
                      )}
                    </Grid>
                  </>
                );
              })}
            </>
          )}
          {/* project type fixed */}
          {formik.values.Project_Type === "Fixed" && (
            <>
              <Grid size={{sm: 6, xs: 6, md: 6}}>
                <Input
                  type="text"
                  labelText="Project Estimate Hours"
                  placeholder={"please Enter Estimate Hours"}
                  name="Project_Hours"
                  onChange={formik.handleChange}
                  value={formik.values.Project_Hours}
                />
              </Grid>
            </>
          )}

          {/* project type fixed */}

          <Grid size={{sm: 12}}>
            <Grid size={{xs: 12, sm: 12}}>
              <Typography variant="h6">
                Select Role Resource &nbsp;---------------------------------
              </Typography>

              {formik.values.roleResources.map((role, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <InputSelect
                      labelText="Role Resource"
                      placeholder="--- Please Select Resource ---"
                      name={`roleResources[${index}].RRId`}
                      value={role.RRId}
                      onChange={formik.handleChange}
                      options={IsStaffdata.filter(
                        (item) =>
                          item.staff_Id !== formik.values.Project_ManagersId
                      ).map((item) => ({
                        label: item.FirstName,
                        value: item.staff_Id,
                      }))}
                    />
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <InputSelect
                      labelText="Role Name"
                      placeholder="--- Please select Roles ---"
                      onChange={formik.handleChange}
                      name={`roleResources[${index}].RId`}
                      value={role.RId}
                      options={IsRoledata.map((item) => ({
                        value: item.RoleId,
                        label: item.RoleName,
                      }))}
                    />
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 12}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`roleResources[${index}].billable`}
                          checked={role.billable}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Billable"
                    />
                  </Grid>
                  {role.billable && (
                    <>
                      <Grid item size={{sm: 12, xs: 12, md: 6}}>
                        <Input
                          labelText="Engagement_Ratio"
                          type="number"
                          placeholder={"Please Enter Engagement Ratio"}
                          name={`roleResources[${index}].Engagement_Ratio`}
                          value={role.Engagement_Ratio}
                          onChange={formik.handleChange}
                        />
                      </Grid>

                      <Grid item size={{sm: 12, xs: 12, md: 6}}>
                        <Input
                          labelText="Rate"
                          name={`roleResources[${index}].Rate`}
                          type="number"
                          placeholder={"Please Enter Project Rate"}
                          value={role.Rate}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item size={{sm: 12, xs: 12, md: 6}}>
                        <InputSelect
                          labelText="Unit"
                          name={`roleResources[${index}].Unit`}
                          placeholder="--- Please select Unit ---"
                          value={role.Unit}
                          onChange={formik.handleChange}
                          options={[
                            {value: "Fixed", label: "Fixed"},
                            {value: "Hourly", label: "Hourly"},
                            {value: "Daily", label: "Daily"},
                            {value: "Monthly", label: "Monthly"},
                            {value: "Weekly", label: "Weekly"},
                          ]}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item size={{sm: 12, xs: 12, md: 6}} sx={{my: 1}}>
                    <Button
                      onClick={() => removeRoleResource(index)}
                      variant="outlined"
                      color="secondary"
                      startIcon={<RemoveCircleOutline />}
                    >
                      Remove Role
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Grid item size={{sm: 12, xs: 12, md: 6}}>
                <Button
                  onClick={addRoleResource}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Role
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{sm: 12}}>
            <Grid size={{xs: 12, sm: 12}}>
              <Typography variant="h6">
                Select Project Manager &nbsp;---------------------------------
              </Typography>

              {formik.values.roleProjectMangare.map((role, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <InputSelect
                      name={`roleProjectMangare[${index}].RRId`}
                      labelText={"Select Resource"}
                      value={role.RRId}
                      onChange={formik.handleChange}
                      placeholder="--- Please select your Project Resource ---"
                      options={IsStaffdata.filter(
                        (item) =>
                          item.staff_Id !== formik.values.Project_ManagersId
                      ).map((item) => ({
                        value: item.staff_Id,
                        label: item.FirstName,
                      }))}
                    />
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <InputSelect
                      labelText="Role"
                      placeholder="--- please select Resources Role ---"
                      name={`roleProjectMangare[${index}].RId`}
                      value={role.RId}
                      onChange={formik.handleChange}
                      options={IsRoledata.map((item) => ({
                        label: item.RoleName,
                        value: item.RoleId,
                      }))}
                    />
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`roleProjectMangare[${index}].IsProjectManager`}
                          checked={role.IsProjectManager}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Select Project Manager"
                    />
                  </Grid>
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`roleProjectMangare[${index}].billable`}
                          checked={role.billable}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label="Billable"
                    />
                  </Grid>
                  {role.billable && (
                    <>
                      <Grid item size={{sm: 12, xs: 12, md: 6}} sx={{mt: 2}}>
                        <InputSelect
                          labelText="Unit"
                          name={`roleProjectMangare[${index}].Unit`}
                          placeholder="--- please select unit ---"
                          value={role.Unit}
                          onChange={formik.handleChange}
                          options={[
                            {value: "Fixed", label: "Fixed"},
                            {value: "Hourly", label: "Hourly"},
                            {value: "Daily", label: "Daily"},
                            {value: "Monthly", label: "Monthly"},
                            {value: "Weekly", label: "Weekly"},
                          ]}
                        />
                      </Grid>

                      <Grid item size={{sm: 12, xs: 12, md: 6}}>
                        <Input
                          labelText="Rate"
                          name={`roleProjectMangare[${index}].Rate`}
                          placeholder={"Please Enter Your Rate"}
                          type="number"
                          value={role.Rate}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item size={{sm: 12, xs: 12, md: 6}}>
                        <Input
                          labelText="Engagement_Ratio"
                          type="Number"
                          placeholder={"Please Enter Your Engagement Ratio"}
                          name={`roleProjectMangare[${index}].Engagement_Ratio`}
                          value={role.Engagement_Ratio}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item size={{sm: 12, xs: 12, md: 6}}>
                    <Button
                      onClick={() => removeProjectmanagerResource(index)}
                      color="secondary"
                      variant="outlined"
                      startIcon={<RemoveCircleOutline />}
                    >
                      Remove Resources
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Grid item size={{sm: 12, xs: 12, md: 6}}>
                <Button
                  onClick={addroleProjectMangare}
                  sx={{mx: 1}}
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                >
                  Add Resources
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{sm: 12}}>
            <Button
              fullWidth
              type="submit"
              sx={{
                background: "#2c3e50",
                padding: "8px 10px",
                margin: "10px 0px",
                color: "white",
              }}
            >
              {IsEdit ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProjectForm;
