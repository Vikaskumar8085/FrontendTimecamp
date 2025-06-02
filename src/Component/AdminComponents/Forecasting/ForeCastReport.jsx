import React from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  ListItemText,
  Paper,
  Grid2,
} from "@mui/material";
import {useFormik, FieldArray, FormikProvider} from "formik";

const ProjectForecastForm = () => {
  const isroledata = [
    {RoleId: "1", RoleName: "Frontend Developer"},
    {RoleId: "2", RoleName: "Backend Developer"},
  ];

  const isdesignationdata = [
    {Designation_Id: "1", Designation_Name: "Junior"},
    {Designation_Id: "2", Designation_Name: "Senior"},
  ];

  const formik = useFormik({
    initialValues: {
      Enquiry_Name: "",
      Estimate_Dev_Hours: "",
      Period_Days: "",
      Start_Date: "",
      resourceRequirements: [
        {
          RoleId: "",
          DesignationId: "",
          Min_Exp: "",
          Max_Exp: "",
          Number_of_developer: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log("Submitted data:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
          <Grid2
            sx={{background: "#2c3e50", p: 2, color: "white"}}
            size={{lg: 12, md: 12, sm: 12, xs: 12}}
          >
            <Typography>Project Forecast</Typography>
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              margin="normal"
              label="Enquiry Name"
              name="Enquiry_Name"
              value={formik.values.Enquiry_Name}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              margin="normal"
              label="Estimate Development Hours"
              name="Estimate_Dev_Hours"
              value={formik.values.Estimate_Dev_Hours}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              type="number"
              margin="normal"
              label="Period Days"
              name="Period_Days"
              value={formik.values.Period_Days}
              onChange={formik.handleChange}
            />
          </Grid2>

          <Grid2 size={{md: 4, sm: 12, xs: 12}}>
            <TextField
              fullWidth
              type="date"
              margin="normal"
              InputLabelProps={{shrink: true}}
              label="Start Date"
              name="Start_Date"
              value={formik.values.Start_Date}
              onChange={formik.handleChange}
            />
          </Grid2>

          <FieldArray name="resourceRequirements">
            {({push, remove}) => (
              <>
                <Grid2
                  sx={{background: "#2c3e50", p: 2, color: "white"}}
                  size={{md: 12, lg: 12, sm: 12, xs: 12}}
                >
                  <Typography>Resource Requirements</Typography>
                </Grid2>

                {formik.values.resourceRequirements.map((_, index) => (
                  <React.Fragment key={index}>
                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`Role-select-label-${index}`}>
                          Select Role
                        </InputLabel>
                        <Select
                          labelId={`Role-select-label-${index}`}
                          id={`Role-select-${index}`}
                          name={`resourceRequirements[${index}].RoleId`}
                          value={
                            formik.values.resourceRequirements[index].RoleId
                          }
                          onChange={formik.handleChange}
                          label="Select Role"
                        >
                          {isroledata.map((item) => (
                            <MenuItem key={item.RoleId} value={item.RoleId}>
                              <ListItemText primary={item.RoleName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`Designation-select-label-${index}`}>
                          Select Designation
                        </InputLabel>
                        <Select
                          labelId={`Designation-select-label-${index}`}
                          id={`Designation-select-${index}`}
                          name={`resourceRequirements[${index}].DesignationId`}
                          value={
                            formik.values.resourceRequirements[index]
                              .DesignationId
                          }
                          onChange={formik.handleChange}
                          label="Select Designation"
                        >
                          {isdesignationdata.map((item) => (
                            <MenuItem
                              key={item.Designation_Id}
                              value={item.Designation_Id}
                            >
                              <ListItemText primary={item.Designation_Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Min Experience (Years)"
                        name={`resourceRequirements[${index}].Min_Exp`}
                        value={
                          formik.values.resourceRequirements[index].Min_Exp
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Max Experience (Years)"
                        name={`resourceRequirements[${index}].Max_Exp`}
                        value={
                          formik.values.resourceRequirements[index].Max_Exp
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2 size={{md: 4, sm: 12, xs: 12}}>
                      <TextField
                        fullWidth
                        type="number"
                        margin="normal"
                        label="Number of Developer"
                        name={`resourceRequirements[${index}].Number_of_developer`}
                        value={
                          formik.values.resourceRequirements[index]
                            .Number_of_developer
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid2>

                    <Grid2
                      size={{md: 4, sm: 12, xs: 12}}
                      sx={{display: "flex", alignItems: "center"}}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                        disabled={
                          formik.values.resourceRequirements.length === 1
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </React.Fragment>
                ))}

                <Grid2 size={{md: 12}}>
                  <Button
                    variant="contained"
                    sx={{mt: 1}}
                    onClick={() =>
                      push({
                        RoleId: "",
                        DesignationId: "",
                        Min_Exp: "",
                        Max_Exp: "",
                        Number_of_developer: "",
                      })
                    }
                  >
                    + Add Resource Requirement
                  </Button>
                </Grid2>
              </>
            )}
          </FieldArray>

          <Grid2 size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <Button
              type="submit"
              sx={{background: "#2c3e50", color: "white", mt: 2}}
              fullWidth
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </FormikProvider>
    </form>
  );
};

export default ProjectForecastForm;

// const moment = require('moment');
// const Employee = require('../models/Employee'); // Adjust path as needed

// async function forecastNewProjectResources(company, enquiry_name, required_hours, period_days, start_date, resource_requirements = []) {
//   const endDate = moment(start_date).add(period_days - 1, 'days');
//   const totalRequiredHours = required_hours ? parseInt(required_hours) : 0;
//   let remainingHours = totalRequiredHours;

//   const employees = await Employee.find({ is_active: true, company_name: company });

//   let filteredEmployees = employees;

//   if (resource_requirements && resource_requirements.length > 0) {
//     filteredEmployees = [];

//     for (const req of resource_requirements) {
//       const {
//         role: role_id,
//         designation: designation_id,
//         experience_min = 0,
//         experience_max = 100,
//         num_developers = 500,
//         hours_percentage = 0
//       } = req;

//       let query = employees;

//       if (role_id) {
//         query = query.filter(emp => emp.projectrole?.role?.toString() === role_id.toString());
//       }
//       if (designation_id) {
//         query = query.filter(emp => emp.designation1?.toString() === designation_id.toString());
//       }
//       if (experience_min || experience_max) {
//         const minDate = moment(start_date).subtract(experience_max, 'years');
//         const maxDate = moment(start_date).subtract(experience_min, 'years');
//         query = query.filter(emp =>
//           moment(emp.start_date).isBetween(minDate, maxDate, null, '[]')
//         );
//       }

//       filteredEmployees.push(...query.slice(0, num_developers));
//     }

//     filteredEmployees = [...new Set(filteredEmployees)];
//   }

//   const allocations = [];
//   const totalAvailableHoursPerDay = {};
//   const developerSummary = {};
//   const benchDevelopers = [];
//   const availableEmployees = {};

//   let currentDate = moment(start_date);
//   while (currentDate.isSameOrBefore(endDate) && (remainingHours > 0 || !totalRequiredHours)) {
//     let dailyTotal = 0;

//     for (const emp of filteredEmployees) {
//       const availableHours = await emp.getDailyAvailableHours(currentDate.toDate(), company);
//       if (availableHours > 0) {
//         const hoursToAllocate = totalRequiredHours ? Math.min(availableHours, remainingHours) : availableHours;

//         if (totalRequiredHours) {
//           remainingHours -= hoursToAllocate;
//           dailyTotal += hoursToAllocate;
//         }

//         allocations.push({
//           employee_id: emp._id.toString(),
//           date: currentDate.format('YYYY-MM-DD'),
//           hours: hoursToAllocate,
//           daily_available: availableHours,
//         });

//         if (!developerSummary[emp._id]) {
//           const isBench = availableHours === 8;
//           developerSummary[emp._id] = {
//             employee_id: emp._id.toString(),
//             name: `${emp.first_name} ${emp.last_name}`,
//             designation: emp.designation1?.name || 'N/A',
//             role: emp.role,
//             experience: emp.getExperienceYears(start_date),
//             total_hours: 0,
//             daily_availability: {},
//             is_bench: isBench,
//           };
//         }

//         developerSummary[emp._id].total_hours += hoursToAllocate;
//         developerSummary[emp._id].daily_availability[currentDate.format('YYYY-MM-DD')] = availableHours;

//         if (developerSummary[emp._id].is_bench && availableHours < 8) {
//           developerSummary[emp._id].is_bench = false;
//         }

//         if (!availableEmployees[emp._id]) {
//           availableEmployees[emp._id] = {
//             name: `${emp.first_name} ${emp.last_name}`,
//             total_available_hours: 0,
//             days_available: 0,
//           };
//         }

//         availableEmployees[emp._id].total_available_hours += availableHours;
//         availableEmployees[emp._id].days_available += 1;
//       }
//     }

//     totalAvailableHoursPerDay[currentDate.format('YYYY-MM-DD')] = dailyTotal;
//     currentDate = currentDate.add(1, 'days');
//   }

//   for (const [emp_id, summary] of Object.entries(developerSummary)) {
//     if (summary.is_bench) {
//       benchDevelopers.push(summary.name);
//     }
//   }

//   const availableEmployeesList = Object.values(availableEmployees).map(data => ({
//     name: data.name,
//     avg_daily_available_hours: data.total_available_hours / data.days_available,
//   }));

//   const totalAllocatedHours = totalRequiredHours - remainingHours;
//   const completionDays = totalAllocatedHours === 0
//     ? period_days
//     : Math.min(period_days, Object.values(totalAvailableHoursPerDay).filter(hours => hours > 0).length);

//   return {
//     enquiry_name: enquiry_name || '',
//     required_hours: totalRequiredHours,
//     remaining_hours: remainingHours,
//     allocations: Object.values(developerSummary),
//     bench_developers: [...new Set(benchDevelopers)],
//     available_employees: availableEmployeesList,
//     start_date: moment(start_date).format('YYYY-MM-DD'),
//     end_date: endDate.format('YYYY-MM-DD'),
//     period_days,
//     completion_days: totalRequiredHours ? completionDays : period_days,
//   };
// }
