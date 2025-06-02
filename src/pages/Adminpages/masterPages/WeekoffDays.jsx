import React, {useEffect} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {useFormik} from "formik";
import {
  Paper,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import {
  createweekoffdaysapicall,
  fetchweekoffdaysapicall,
} from "../../../ApiServices/MasterApiServices/WeekOffDays";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const WeekoffDays = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    AllowbacklogEntryOnWeekOff: Yup.boolean(),
    Week_Off_Days: Yup.array().when("AllowbacklogEntryOnWeekOff", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "Select at least one weekday")
          .required("Weekdays are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      AllowbacklogEntryOnWeekOff: false,
      Week_Off_Days: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createweekoffdaysapicall(values);
        console.log(response, "data");

        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });
  const handleWeekdaysChange = (event) => {
    const {
      target: {value},
    } = event;
    formik.setFieldValue(
      "Week_Off_Days",
      typeof value === "string" ? value.split(",") : value
    );
  };
  // fetch week off days

  const fetchweekoffdaysfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchweekoffdaysapicall();
      console.log(response, "................");
      if (response.success) {
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      console.log(error?.message);
    }
  };

  // fetch week off days

  useEffect(() => {
    fetchweekoffdaysfunc();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Week off days" />
      <Paper sx={{p: 2}}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{maxWidth: 400}}
        >
          <Typography variant="h6" mb={2}>
            Weekday Selection Form
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="AllowbacklogEntryOnWeekOff"
                  checked={formik.values.AllowbacklogEntryOnWeekOff}
                  onChange={formik.handleChange}
                />
              }
              label="Enable Weekday Selection"
            />
          </FormGroup>

          {formik.values.AllowbacklogEntryOnWeekOff && (
            <FormControl
              fullWidth
              margin="normal"
              error={
                formik.touched.Week_Off_Days &&
                Boolean(formik.errors.Week_Off_Days)
              }
            >
              <InputLabel id="weekday-label">Select Week Off Days</InputLabel>
              <Select
                labelId="weekday-label"
                id="Week_Off_Days"
                name="Week_Off_Days"
                multiple
                value={formik.values.Week_Off_Days}
                onChange={handleWeekdaysChange}
                onBlur={formik.handleBlur}
                renderValue={(selected) => selected.join(", ")}
              >
                {weekdays.map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox
                      checked={formik.values.Week_Off_Days.includes(day)}
                    />
                    {day}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.Week_Off_Days && formik.errors.Week_Off_Days && (
                <FormHelperText>{formik.errors.Week_Off_Days}</FormHelperText>
              )}
            </FormControl>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{mt: 2, width: "100%", background: "#6560f0"}}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </LayoutDesign>
  );
};

export default WeekoffDays;
