import React, {useEffect, useState} from "react";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import * as Yup from "yup";
import {
  Button,
  Container,
  Drawer,
  FormControl,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import {useFormik} from "formik";
import AddIcon from "@mui/icons-material/Add";
import apiInstance from "../../../ApiInstance/apiInstance";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import {fetchclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import InputSelect from "../../../common/InputSelect/InputSelect";
const validationSchema = Yup.object({
  clientId: Yup.string().required("Invoice clientId is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  rate: Yup.number().required("Rate is required"),
  percentage: Yup.number().required("Percentage is required"),
  term: Yup.string()
    .max(30, "Maximum 30 characters")
    .required("Term is required"),
});
const Invoice = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [Isinvoicedata, setIsinvoicedata] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [clients, setClients] = useState([]);
  const dispatch = useDispatch();
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
  const formik = useFormik({
    initialValues: {
      clientId: "",
      startDate: "",
      endDate: "",
      rate: "",
      percentage: "",
      term: "",
    },
    // validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        // you can replace this with your API call
        const formattedData = {
          ...values,
          startDate: moment(values.startDate).format("DD/MM/YYYY"),
          endDate: moment(values.endDate).format("DD/MM/YYYY"),
        };
        const response = await apiInstance.post(
          "/v1/admin/create-invoice",
          formattedData
        );
        if (response?.data?.success) {
          dispatch(setLoader(false));
          setIsOpen(false);
        } else {
          setIsOpen(false);
          dispatch(setLoader(false));
          toast.error(response?.data?.message);
        }
      } catch (error) {
        setIsOpen(false);
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const fetchinvoicefunc = async () => {
    try {
      dispatch(setLoader(true));

      const response = await apiInstance.get("/v1/admin/fetch-invoice");
      console.log(response, "response ");
      if (response.data?.success) {
        dispatch(setLoader(false));
        setIsinvoicedata(response?.data?.success);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchinvoicefunc();
    getclientdata();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Invoice" />
      <Button
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
      >
        Create Invoice
      </Button>
      {/* create invoice */}
      {IsOpen && (
        <TModal
          open={IsOpen}
          title="create Invoice"
          onClose={() => setIsOpen(false)}
        >
          <Container maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
              <Grid2 spacing={2} container>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="client-select-label">
                      Select Client
                    </InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      name="clientId"
                      value={formik.values.clientId}
                      onChange={formik.handleChange}
                      label="Select Client"
                      fullWidth
                    >
                      {clients.map((client) => (
                        <MenuItem
                          key={client.Client_Id}
                          value={client.Client_Id}
                        >
                          <ListItemText primary={client.Client_Name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    id="startDate"
                    name="startDate"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    id="endDate"
                    name="endDate"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Rate"
                    type="number"
                    fullWidth
                    id="rate"
                    name="rate"
                    value={formik.values.rate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rate && Boolean(formik.errors.rate)}
                    helperText={formik.touched.rate && formik.errors.rate}
                  />
                </Grid2>

                <Grid2 size={{md: 6, sm: 12, xs: 12}}>
                  <TextField
                    label="Percentage"
                    type="number"
                    fullWidth
                    id="percentage"
                    name="percentage"
                    value={formik.values.percentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.percentage &&
                      Boolean(formik.errors.percentage)
                    }
                    helperText={
                      formik.touched.percentage && formik.errors.percentage
                    }
                  />
                </Grid2>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <TextField
                    label="Term"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    id="term"
                    name="term"
                    inputProps={{maxLength: 30}}
                    value={formik.values.term}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.term && Boolean(formik.errors.term)}
                    helperText={
                      formik.touched.term && formik.errors.term
                        ? formik.errors.term
                        : `${formik.values.term.length}/30`
                    }
                  />
                </Grid2>

                <Grid2 size={{sm: 12, xs: 12}}>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      background: "#6560f0",
                      padding: "8px 10px",
                      margin: "10px 0px",
                      color: "white",
                    }}
                  >
                    Generate Invoice
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Container>
        </TModal>
      )}
      {/* create invoice */}

      {/* table of Invoice */}

      <Button
        onClick={() => {
          setIsUpdate(true);
        }}
      >
        update Invoice
      </Button>
      {isUpdate && (
        <TModal
          title={"Update Invoice"}
          open={isUpdate}
          onClose={() => setIsUpdate(false)}
        >
          <Container maxWidth="md">
            <form>
              <Grid2 spacing={2} container>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <InputSelect
                    type="text"
                    placeholder="--- Please Select Pamyent Mode ---"
                    options={[
                      {label: "PAID", value: "PAID"},
                      {label: "UNPAID", value: "UNPAID"},
                      {label: "PARTIALLY_PAID", value: "PARTIALLY_PAID"},
                    ]}
                    labelText={"Select Invoice Status"}
                  />
                </Grid2>
                <Grid2 size={{sm: 12, xs: 12}}>
                  <Button>submit</Button>
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
              <TableCell>Client</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Terms</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default Invoice;
