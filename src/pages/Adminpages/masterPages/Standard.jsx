import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Button,
  Typography,
  Container,
  Grid2,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import apiInstance from "../../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import TModal from "../../../common/Modal/TModal";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Input from "../../../common/Input/Input";
const Standard = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [Isdata, setIsdata] = useState([]);
  const dispatch = useDispatch();

  // fetch standard

  const fetchstandardfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.get("/v1/master/fetch-standard");
      if (response?.data?.success) {
        dispatch(setLoader(false));
        setIsdata(response?.data?.result);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  // fetch standard

  const formik = useFormik({
    initialValues: {
      Standard_Hours: "",
    },
    validationSchema: Yup.object({
      Standard_Hours: Yup.number()
        .required("Standard hours is required")
        .min(0, "Must be at least 0"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));

        const response = await apiInstance.post(
          "/v1/master/create-standard",
          values
        );
        if (response?.data?.success) {
          dispatch(setLoader(false));
          fetchstandardfunc();
          setIsOpen(false);
          formik.resetForm();
          toast.success(response?.data?.message);
        } else {
          formik.resetForm();
          dispatch(setLoader(fasle));
          toast.error(response?.data?.message);
        }
      } catch (error) {
        formik.resetForm();
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message);
      }
    },
  });

  // delete query

  const handledelete = async (value) => {
    try {
      console.log(value);
      dispatch(setLoader(true));

      const response = await apiInstance.delete(
        `/v1/master/remove-standard/${value.standard_Id}`
      );
      fetchstandardfunc();
      if (response?.data?.success) {
        fetchstandardfunc();
        dispatch(setLoader(false));

        toast.success(response?.data?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(error?.response?.data.message);
    }
  };

  useEffect(() => {
    fetchstandardfunc();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Standard" />

      <Button
        sx={{
          margin: "5px 0px",
          padding: "10px 15px",
          background: "#6560f0",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      {IsOpen && (
        <TModal
          title=" Add Standard"
          onClose={() => setIsOpen(false)}
          open={IsOpen}
        >
          <Container maxWidth="md">
            <Typography sx={{margin: 2}} variant="h6"></Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container spacing={2}>
                <Grid2 item size={{sm: 12}}>
                  <Input
                    name="Standard_Hours"
                    labelText="Standard Hours"
                    type="number"
                    fullWidth
                    value={formik.values.Standard_Hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.Standard_Hours &&
                    formik.errors.Standard_Hours && (
                      <div style={{color: "red", fontSize: "14px"}}>
                        {formik.errors?.Standard_Hours}
                      </div>
                    )}
                </Grid2>
                <Grid2 item size={{sm: 12}}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      padding: "10px 15px",
                      background: "#6560f0",
                      color: "white",
                      "&:hover": {background: "#34495e"},
                    }}
                  >
                    submit
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Container>
        </TModal>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Standard Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Isdata?.length > 0
              ? Isdata?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.Standard_Hours}</TableCell>

                      <TableCell>
                        <button onClick={() => handledelete(item)}>
                          delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default Standard;
