// import React, {useState} from "react";
// import {
//   Typography,
//   Paper,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Button,
//   Grid2,
// } from "@mui/material";
// import {useFormik} from "formik";

// const quarterlyMonths = {
//   Q1: ["January", "February", "March"],
//   Q2: ["April", "May", "June"],
//   Q3: ["July", "August", "September"],
//   Q4: ["October", "November", "December"],
// };

// const allMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const quarterOptions = Object.entries(quarterlyMonths).map(
//   ([quarter, months]) => ({
//     label: `${quarter} (${months.join(", ")})`,
//     value: quarter,
//   })
// );

// const ProjectForecast = () => {
//   const [filterType, setFilterType] = useState("quarterly");

//   const formik = useFormik({
//     initialValues: {
//       startPeriod: "",
//       endPeriod: "",
//     },
//     onSubmit: (values) => {
//       console.log("Form submitted:", values);
//     },
//   });

//   const renderPeriodOptions = () => {
//     if (filterType === "quarterly") {
//       return quarterOptions.map((q) => (
//         <MenuItem key={q.value} value={q.value}>
//           {q.label}
//         </MenuItem>
//       ));
//     }
//     return allMonths.map((month) => (
//       <MenuItem key={month} value={month}>
//         {month}
//       </MenuItem>
//     ));
//   };

//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
//           <Grid2
//             sx={{background: "#2c3e50", p: 2, color: "white"}}
//             size={{lg: 12, md: 12, sm: 12, xs: 12}}
//           >
//             <Typography>Project Forecast</Typography>
//           </Grid2>

//           <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="filter-type-label">Filter Type</InputLabel>
//               <Select
//                 labelId="filter-type-label"
//                 value={filterType}
//                 label="Filter Type"
//                 onChange={(e) => setFilterType(e.target.value)}
//               >
//                 <MenuItem value="quarterly">Quarterly</MenuItem>
//                 <MenuItem value="monthly">Monthly</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid2>

//           <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="start-period-label">
//                 {filterType === "quarterly" ? "Start Quarter" : "Start Month"}
//               </InputLabel>
//               <Select
//                 labelId="start-period-label"
//                 name="startPeriod"
//                 value={formik.values.startPeriod}
//                 onChange={formik.handleChange}
//                 label={
//                   filterType === "quarterly" ? "Start Quarter" : "Start Month"
//                 }
//               >
//                 {renderPeriodOptions()}
//               </Select>
//             </FormControl>
//           </Grid2>

//           <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="end-period-label">
//                 {filterType === "quarterly" ? "End Quarter" : "End Month"}
//               </InputLabel>
//               <Select
//                 labelId="end-period-label"
//                 name="endPeriod"
//                 value={formik.values.endPeriod}
//                 onChange={formik.handleChange}
//                 label={filterType === "quarterly" ? "End Quarter" : "End Month"}
//               >
//                 {renderPeriodOptions()}
//               </Select>
//             </FormControl>
//           </Grid2>

//           <Grid2 size={{lg: 12, md: 12}}>
//             <Button type="submit" variant="contained" sx={{mt: 2}}>
//               Submit
//             </Button>
//           </Grid2>
//         </Grid2>
//       </form>

//       <Grid2 sx={{mt: 2}} container spacing={2}>
//         <Grid2 size={{lg: 6, md: 6, sm: 12, xs: 12}}>
//           <Paper>1</Paper>
//         </Grid2>
//         <Grid2 size={{lg: 6, md: 6, sm: 12, xs: 12}}>
//           <Paper>1</Paper>
//         </Grid2>
//       </Grid2>
//     </>
//   );
// };

// export default ProjectForecast;

// router
// routes/quarter.js
// const express = require('express');
// const router  = express.Router();
// const { ensureAuth } = require('../middleware/auth');
// const quarterCtrl    = require('../controllers/quarterController');

// router
//   .route('/')
//   .get( ensureAuth, quarterCtrl.getQuarterForm )
//   .post( ensureAuth, quarterCtrl.postQuarterForm );

// module.exports = router;

// controller

// // controllers/quarterController.js
// const {DateTime} = require("luxon");
// const Company = require("../models/Company");
// const Project = require("../models/Project");
// const ProjectRole = require("../models/ProjectRole");
// const Employee = require("../models/Employee");

// const expectedNewOnboard = 5;

// exports.getQuarterForm = async (req, res, next) => {
//   try {
//     res.render("quarter_projects", {
//       formData: {},
//       benchCount: 0,
//       expectedCompleteCount: 0,
//       expectedNewOnboard,
//       projects: [],
//       months: "",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.postQuarterForm = async (req, res, next) => {
//   try {
//     // 1. Find company for the logged‑in user
//     const company = await Company.findOne({user_for: req.user._id});
//     if (!company) throw new Error("No company found for this user.");

//     // 2. Determine quarter, months, and date range
//     const {quarter} = req.body;
//     const today = DateTime.local().startOf("day");
//     const year = today.year;

//     let months, startDate, endDate;
//     switch (quarter) {
//       case "Q1":
//         months = ["January", "February", "March"];
//         startDate = DateTime.local(year, 1, 1);
//         endDate = DateTime.local(year, 3, 31);
//         break;
//       case "Q2":
//         months = ["April", "May", "June"];
//         startDate = DateTime.local(year, 4, 1);
//         endDate = DateTime.local(year, 6, 30);
//         break;
//       case "Q3":
//         months = ["July", "August", "September"];
//         startDate = DateTime.local(year, 7, 1);
//         endDate = DateTime.local(year, 9, 30);
//         break;
//       case "Q4":
//         months = ["October", "November", "December"];
//         startDate = DateTime.local(year, 10, 1);
//         endDate = DateTime.local(year, 12, 31);
//         break;
//       default:
//         throw new Error("Invalid quarter selected.");
//     }

//     // 3. Fetch all projects ending in that quarter for this company
//     const projects = await Project.find({
//       company,
//       end_date: {
//         $gte: startDate.toJSDate(),
//         $lte: endDate.toJSDate(),
//       },
//     });

//     // 4. Find all project IDs whose end_date ≥ quarter start
//     const ongoingProjectIds = await Project.find({
//       company,
//       end_date: {$gte: startDate.toJSDate()},
//     }).distinct("_id");

//     // 5. Find all employees assigned to those projects
//     const assignedEmployeeIds = await ProjectRole.find({
//       company_name: company,
//       project: {$in: ongoingProjectIds},
//     }).distinct("employee");

//     // 6. Bench = employees in company not in assignedEmployeeIds
//     const benchCount = await Employee.countDocuments({
//       company_name: company,
//       _id: {$nin: assignedEmployeeIds},
//     });

//     // 7. Expected completed = projects that have started and not yet ended as of today
//     const expectedCompleteCount = await Project.countDocuments({
//       company,
//       start_date: {$lte: today.toJSDate()},
//       end_date: {$gte: today.toJSDate()},
//     });

//     // 8. Render with the same template
//     res.render("quarter_projects", {
//       formData: {quarter},
//       benchCount,
//       expectedCompleteCount,
//       expectedNewOnboard,
//       projects,
//       months: months.join(", "),
//     });
//   } catch (err) {
//     // In case of validation errors, you can flash them:
//     req.flash("error", err.message);
//     return this.getQuarterForm(req, res, next);
//   }
// };

// <!-- views/quarter_projects.ejs -->
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Quarterly Projects</title>
// </head>
// <body>
//   <% if (messages.error) { %>
//     <div class="errors"><%= messages.error %></div>
//   <% } %>

//   <form action="" method="POST">
//     <label>
//       Select Quarter:
//       <select name="quarter">
//         <option value="Q1" <%= formData.quarter==='Q1'?'selected':'' %>>Q1</option>
//         <option value="Q2" <%= formData.quarter==='Q2'?'selected':'' %>>Q2</option>
//         <option value="Q3" <%= formData.quarter==='Q3'?'selected':'' %>>Q3</option>
//         <option value="Q4" <%= formData.quarter==='Q4'?'selected':'' %>>Q4</option>
//       </select>
//     </label>
//     <button type="submit">Show</button>
//   </form>

//   <h3>Months: <%= months %></h3>
//   <p>Bench Count: <%= benchCount %></p>
//   <p>Expected Complete: <%= expectedCompleteCount %></p>
//   <p>Expected New Onboard: <%= expectedNewOnboard %></p>

//   <h4>Projects in <%= formData.quarter || '—' %>:</h4>
//   <ul>
//     <% projects.forEach(p => { %>
//       <li><%= p.name %> (ends <%= p.end_date.toDateString() %>)</li>
//     <% }) %>
//   </ul>
// </body>
// </html>
import React, {useState} from "react";
import moment from "moment";
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  List,
  ListItem,
  Paper,
  Button,
} from "@mui/material";

import {useFormik} from "formik";
import apiInstance from "../../../ApiInstance/apiInstance";

function getQuartersByYear(year) {
  return {
    Q1: {
      startDate: moment()
        .year(year)
        .quarter(1)
        .startOf("quarter")
        .startOf("day")
        .toISOString(),
      endDate: moment()
        .year(year)
        .quarter(1)
        .endOf("quarter")
        .endOf("day")
        .toISOString(),
    },
    Q2: {
      startDate: moment()
        .year(year)
        .quarter(2)
        .startOf("quarter")
        .startOf("day")
        .toISOString(),
      endDate: moment()
        .year(year)
        .quarter(2)
        .endOf("quarter")
        .endOf("day")
        .toISOString(),
    },
    Q3: {
      startDate: moment()
        .year(year)
        .quarter(3)
        .startOf("quarter")
        .startOf("day")
        .toISOString(),
      endDate: moment()
        .year(year)
        .quarter(3)
        .endOf("quarter")
        .endOf("day")
        .toISOString(),
    },
    Q4: {
      startDate: moment()
        .year(year)
        .quarter(4)
        .startOf("quarter")
        .startOf("day")
        .toISOString(),
      endDate: moment()
        .year(year)
        .quarter(4)
        .endOf("quarter")
        .endOf("day")
        .toISOString(),
    },
  };
}

const AssignedEmployeesByYearQuarter = () => {
  const currentYear = moment().year();
  const minYear = 2000;

  const [employees, setEmployees] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [engagedEmployees, setEngagedEmployees] = useState([]);
  const [freeEmployees, setFreeEmployees] = useState([]);
  const formik = useFormik({
    initialValues: {
      year: currentYear,
      quarter: "Q2",
    },
    validate: (values) => {
      const errors = {};
      if (!values.year) {
        errors.year = "Required";
      } else if (values.year < minYear || values.year > currentYear) {
        errors.year = `Year must be between ${minYear} and ${currentYear}`;
      }
      if (!values.quarter) {
        errors.quarter = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const year = values.year;
        const quarterNum = values.quarter.replace("Q", "");

        const startDate = moment()
          .year(year)
          .quarter(quarterNum)
          .startOf("quarter")
          .startOf("day")
          .format("YYYY-MM-DD");

        const endDate = moment()
          .year(year)
          .quarter(quarterNum)
          .endOf("quarter")
          .endOf("day")
          .format("YYYY-MM-DD");

        // Replace this with your actual API endpoint
        const res = await apiInstance.post("/v3/forecast/ProjectForecast", {
          startDate,
          endDate,
        });

        setEngagedEmployees(res.data.engagedEmployees);
        setFreeEmployees(res.data.freeEmployees);
      } catch (err) {
        setEngagedEmployees([]);
        setFreeEmployees([]);
      } finally {
        setLoading(false);
      }
    },
  });

  const quarterOptions = [
    {value: "Q1", label: "Q1 - January to March"},
    {value: "Q2", label: "Q2 - April to June"},
    {value: "Q3", label: "Q3 - July to September"},
    {value: "Q4", label: "Q4 - October to December"},
  ];

  return (
    <Paper elevation={3} sx={{maxWidth: 750, mx: "auto", mt: 6, p: 4}}>
      <Typography variant="h5" textAlign="center" mb={3}>
        Employees Assigned by Year & Quarter
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="center" gap={3} mb={4}>
          <TextField
            label="Year"
            fullwidth
            name="year"
            type="number"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
            sx={{width: 120}}
            inputProps={{min: minYear, max: currentYear}}
          />

          <FormControl
            sx={{minWidth: 120}}
            error={formik.touched.quarter && Boolean(formik.errors.quarter)}
          >
            <InputLabel id="quarter-label">Quarter</InputLabel>

            <Select
              labelId="quarter-label"
              label="Quarter"
              name="quarter"
              value={formik.values.quarter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {quarterOptions.map((q) => (
                <MenuItem key={q.value} value={q.value}>
                  {q.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.quarter && formik.errors.quarter && (
              <Typography variant="caption" color="error" sx={{ml: 2, mt: 0.5}}>
                {formik.errors.quarter}
              </Typography>
            )}
          </FormControl>
        </Box>

        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Fetch Employees"
            )}
          </Button>
        </Box>
      </form>

      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      <Typography variant="subtitle1" textAlign="center" mb={2}>
        Total Assigned Employees: {count}
      </Typography>

      {employees.length > 0 ? (
        <List>
          {employees.map((emp) => (
            <ListItem
              key={emp._id}
              sx={{bgcolor: "#f5f5f5", mb: 1, borderRadius: 1}}
            >
              {emp.name}
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && (
          <Typography textAlign="center" color="text.secondary" mt={2}>
            No employees found for this period.
          </Typography>
        )
      )}

      <Typography variant="h6" gutterBottom>
        Engagement Summary
      </Typography>

      <Typography variant="subtitle1">
        Engaged: {engagedEmployees.length} | Free: {freeEmployees.length}
      </Typography>

      <Box display="flex" gap={2}>
        <Box flex={1}>
          <Typography variant="subtitle2" mb={1}>
            Engaged Employees
          </Typography>
          <List>
            {engagedEmployees.map((emp) => (
              <ListItem key={emp.staff_Id}>{emp.name}</ListItem>
            ))}
          </List>
        </Box>

        <Box flex={1}>
          <Typography variant="subtitle2" mb={1}>
            Free Employees
          </Typography>
          <List>
            {freeEmployees.map((emp) => (
              <ListItem key={emp.staff_Id}>{emp.name}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

const ProjectForecast = () => {
  return (
    <div>
      <AssignedEmployeesByYearQuarter />
    </div>
  );
};

export default ProjectForecast;
