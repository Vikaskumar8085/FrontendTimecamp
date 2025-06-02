import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Box,
  Button,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";
import AddIcons from "@mui/icons-material/Add";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {
  createholidayapicall,
  fetchHolidaylistapicall,
  removeholidaylistapicall,
} from "../../../ApiServices/MasterApiServices/Holiday";
import toast from "react-hot-toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TModal from "../../../common/Modal/TModal";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import AddHoliday from "../../../Component/MasterComponent/Holiday/AddHoliday";


const Holiday = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isdata, setisdata] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // 0-indexed
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [IsEdit, setIsEdit] = useState(null);
  const dispatch = useDispatch();

  const fetchholidaylistfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchHolidaylistapicall({
        params: {
          page: page + 1,
          limit,
          search,
        },
      });
      if (response.success) {
        setisdata(response.result);
        setTotal(response.totalItem);
        dispatch(setLoader(false));
      } else {
        setTotal(response.totalItem);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
      setTotal(response.totalItem);
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await createholidayapicall(values);
      if (response.success) {
        setIsOpen(false);
        toast.success(response?.message);
        fetchholidaylistfunc();
      } else {
        setIsOpen(false);
        fetchholidaylistfunc();
        toast.error(response?.message);
      }
      dispatch(setLoader(false));
    } catch (error) {
      setIsOpen(false);
      toast.error(error?.response?.data?.message);
    }
  };

  // remove

  const handledelete = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removeholidaylistapicall(value);
      if (response?.success) {
        fetchholidaylistfunc();
        toast.success(response?.message);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(false));
    }
  };

  // handle Open
  const handlOpen = async (value) => {
    setIsOpen(true);
    setIsEdit(value);
  };

  useEffect(() => {
    fetchholidaylistfunc();
  }, [page, limit, search]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Holiday" />
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
        Add Holiday
      </Button>

      {IsOpen && (
        <TModal
          title={IsEdit ? "Edit Holiday" : "Add Holiday"}
          onClose={() => {
            setIsOpen(false);
            setIsEdit(null);
          }}
          open={IsOpen}
        >
          <AddHoliday IsEdit={IsEdit} setIsEdit={setIsEdit} handleSubmit={handleSubmit} />
        </TModal>
      )}

      <TextField
        label="Search Holiday"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Holiday Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isdata.map((holiday, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>

                <TableCell>{holiday.Name}</TableCell>
                <TableCell>
                  {new Date(holiday.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    sx={{color: "red"}}
                    onClick={() => handledelete(holiday.Holiday_Id)}
                  />
                  <EditOutlinedIcon
                    onClick={() => handlOpen(holiday)}
                    sx={{color: "blue"}}
                  />
                </TableCell>
              </TableRow>
            ))}
            {isdata.length === 0 && (
              <TableRow>
                <TableCell colSpan={30} align="center">
                  No Holidays Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[1, 5, 10, 25]}
      />
    </LayoutDesign>
  );
};

export default Holiday;
