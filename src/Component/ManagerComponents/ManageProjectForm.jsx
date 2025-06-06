import React, {useEffect, useState} from "react";
import moment from "moment";
import {
  fetchmanagerclientsapicall,
  fetchmanagerrolesapicall,
  fetchmanagerstaffapicall,
} from "../../ApiServices/ManagerApiServices";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  AddCircleOutline,
  AddCircle,
  RemoveCircleOutline,
  RemoveCircle,
} from "@mui/icons-material";
import Input from "../../common/Input/Input";
import InputSelect from "../../common/InputSelect/InputSelect";

const ManageProjectForm = ({
  updateprojecthandleSubmit,
  IsEdit,
  handleSubmit,
}) => {
  const [isclientdata, setisclientdata] = useState([]);
  const [isrolesdata, setIsrolesdata] = useState([]);
  const [isstaffdata, setisstaffdata] = useState([]);

  const fetchclientfunc = async () => {
    try {
      const response = await fetchmanagerclientsapicall();
      if (response.success) {
        setisclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchrolesfunc = async () => {
    try {
      const response = await fetchmanagerrolesapicall();
      if (response?.success) {
        setIsrolesdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchstafffunc = async () => {
    try {
      const response = await fetchmanagerstaffapicall();
      if (response?.success) {
        setisstaffdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchclientfunc();
    fetchrolesfunc();
    fetchstafffunc();
  }, [0]);

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
        console.log("Form Submitted", values);
        handleSubmit(values);
        formik.resetForm();
      } else {
        updateprojecthandleSubmit(values);
        formik.resetForm();
      }

      // formik.resetForm();
    },
  });
  //--------------------------------------------------------------------------------------------------------------

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
          IsProjectManager: false,
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

  //--------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Container maxWidth="lg">
        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                labelText="Project Name"
                placeholder={"Please enter Project Name"}
                {...formik.getFieldProps("Project_Name")}
                type={"text"}
              />
              {formik.touched.Project_Name && formik.errors.Project_Name && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {formik.errors.Project_Name}
                </div>
              )}
            </Grid>

            <Grid size={{sm: 12, md: 6}} sx={{mt: 1}}>
              <InputSelect
                name={"clientId"}
                value={formik.values.clientId}
                onChange={formik.handleChange}
                labelText={"Select Client"}
                placeholder={"---Please Select your Client---"}
                options={isclientdata.map((client) => ({
                  label: client.Client_Name,
                  value: client.Client_Id,
                }))}
              />
              {formik.touched.clientId && formik.errors.clientId && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {formik.errors.clientId}
                </div>
              )}
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type="date"
                labelText="Start Date"
                value={formik.values.Start_Date}
                name="Start_Date"
                {...formik.getFieldProps("Start_Date")}
              />
              {formik.touched.Start_Date && formik.errors.Start_Date && (
                <div style={{color: "red", font: "14px"}}>
                  {formik.errors.Start_Date}
                </div>
              )}
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <Input
                type="date"
                labelText="End Date"
                name="End_Date"
                {...formik.getFieldProps("End_Date")}
              />
              {formik.touched.End_Date && formik.errors.End_Date && (
                <div style={{color: "red", font: "14px"}}>
                  {formik.errors.End_Date}
                </div>
              )}
            </Grid>
            <Grid size={{sm: 12, md: 6}}>
              <InputSelect
                type={"text"}
                labelText={"currency"}
                {...formik.getFieldProps("currency")}
                placeholder="--- please select currency ---"
                options={[
                  {value: "US Dollor", label: "US Dollor"},
                  {value: "Euro", label: "Euro"},
                  {value: "British Pound", label: "British Pound"},
                  {value: "INR", label: "INR"},
                ]}
              />
              {formik.touched.currency && formik.errors.currency && (
                <div style={{color: "red", font: "14px"}}>
                  {formik.errors.currency}
                </div>
              )}
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
            {/*Bucket */}

            {/* select Role Resources */}
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
                        options={isstaffdata
                          .filter(
                            (item) =>
                              item.staff_Id !== formik.values.Project_ManagersId
                          )
                          .map((item) => ({
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
                        options={isrolesdata.map((item) => ({
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
                            value={role.Type}
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
            {/* select Role Resources */}
            {/* select project Manager */}
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
                        options={isstaffdata
                          .filter(
                            (item) =>
                              item.staff_Id !== formik.values.Project_ManagersId
                          )
                          .map((item) => ({
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
                        options={isrolesdata.map((item) => ({
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
                            value={role.Type}
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
            {/* select project Manager */}

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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default ManageProjectForm;
