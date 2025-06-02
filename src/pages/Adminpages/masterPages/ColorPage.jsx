import React, {useEffect, useCallback, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import * as Yup from "yup";
import AddIcons from "@mui/icons-material/Add";
import Input from "../../../common/Input/Input";
import {
  Button,
  Grid,
  Container,
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {
  createcolorapicall,
  fetchcolorapicall,
  removecolorapicall,
} from "../../../ApiServices/MasterApiServices/Color";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TModal from "../../../common/Modal/TModal";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

// validate
const validationSchema = Yup.object({
  Name: Yup.string().required("Color is required"),

  min_percentage: Yup.number()
    .typeError("Minimum percentage must be a number")
    .required("Minimum percentage is required")
    .min(0, "Minimum percentage cannot be negative")
    .test(
      "min-less-than-or-equal-max",
      "Minimum must not be greater than Maximum",
      function (value) {
        const {max_percentage} = this.parent;
        return value <= max_percentage;
      }
    ),

  max_percentage: Yup.number()
    .typeError("Maximum percentage must be a number")
    .required("Maximum percentage is required")
    .min(0, "Maximum percentage cannot be negative")
    .moreThan(
      Yup.ref("min_percentage"),
      "Maximum must be greater than Minimum"
    ),
});
// validate
const ColorPage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [IsData, setIsData] = useState([]);
  const dispatch = useDispatch();

  // fetch color

  const fetchcolorfunc = useCallback(async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchcolorapicall();
      if (response?.success) {
        dispatch(setLoader(false));
        setIsData(response?.result);
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  }, []);

  // create color
  const formik = useFormik({
    initialValues: {
      Name: "",
      min_percentage: "",
      max_percentage: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await createcolorapicall(values);
        if (response?.success) {
          dispatch(setLoader(false));
          toast.success(response?.message);
          setIsOpen(false);
          fetchcolorfunc();
          formik.resetForm();
        } else {
          setIsOpen(false);
          dispatch(setLoader(false));
          formik.resetForm();
          toast.error(response?.message);
          fetchcolorfunc();
        }
      } catch (error) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchcolorfunc();
        formik.resetForm();
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleDelete = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removecolorapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        fetchcolorfunc();
        toast.success(response?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchcolorfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      fetchcolorfunc();
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchcolorfunc();
  }, [fetchcolorfunc]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Color" />
      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
        startIcon={<AddIcons />}
      >
        Add Colors
      </Button>

      {IsOpen && (
        <TModal
          title="Add Colors"
          onClose={() => setIsOpen(false)}
          open={IsOpen}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                p: 1,
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <Input
                      labelText="Name"
                      style={{padding: "2px"}}
                      type="color"
                      value={formik.values.Name}
                      {...formik.getFieldProps("Name")}
                    />
                    {formik.touched.Name && formik.errors.Name && (
                      <div style={{color: "red", fontSize: "14px"}}>
                        {formik.errors.Name}
                      </div>
                    )}
                  </Grid>

                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <Input
                      labelText="Min values"
                      type="number"
                      placeholder="Min values"
                      value={formik.values.min_percentage}
                      {...formik.getFieldProps("min_percentage")}
                    />
                    {formik.touched.min_percentage &&
                      formik.errors.min_percentage && (
                        <div style={{color: "red", fontSize: "14px"}}>
                          {formik.errors.min_percentage}
                        </div>
                      )}
                  </Grid>
                  <Grid sm={6} md={12} sx={{mt: 3}}>
                    <Input
                      labelText="Max values"
                      value={formik.values.max_percentage}
                      placeholder="Max values"
                      type="number"
                      {...formik.getFieldProps("max_percentage")}
                    />
                    {formik.touched.max_percentage &&
                      formik.errors.max_percentage && (
                        <div style={{color: "red", fontSize: "14px"}}>
                          {formik.errors.max_percentage}
                        </div>
                      )}
                  </Grid>

                  <Grid sm={6} md={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        background: "#6560f0",
                        width: "100%",
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
            </Box>
          </Container>
        </TModal>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Color Name</TableCell>
              <TableCell>Min value</TableCell>
              <TableCell>Max value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsData?.length > 0
              ? IsData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          disabled
                          type="color"
                          style={{height: "50px", padding: "10px"}}
                          value={item?.Name}
                        />
                      </TableCell>
                      <TableCell>{item?.min_percentage}</TableCell>
                      <TableCell>{item?.max_percentage}</TableCell>
                      <TableCell>
                        <DeleteOutlineIcon
                          sx={{color: "red"}}
                          onClick={() => handleDelete(item.Color_Id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              : "Not Found"}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default ColorPage;
