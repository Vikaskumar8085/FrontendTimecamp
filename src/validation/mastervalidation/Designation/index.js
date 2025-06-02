import * as Yup from "yup";

const DesignationValidate = Yup.object({
  Designation_Name: Yup.string()
    .trim()
    .min(3, "Designation must be at least 3 characters")
    .max(50, "Designation cannot exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces allowed")
    .required("Designation is required"),
});

export default DesignationValidate;
