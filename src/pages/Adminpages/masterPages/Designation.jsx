import * as React from "react";
import Button from "@mui/material/Button";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {useFormik} from "formik";
import DesignationTable from "../../../Component/MasterComponent/Designation/DesignationTable";
import {
  createdesignationapicall,
  fetchdesignationapicall,
  removedesignationapicall,
  updatedesignationapicall,
} from "../../../ApiServices/MasterApiServices/Designation";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import AddDesignation from "../../../Component/MasterComponent/Designation/AddDesignation";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import {addDesignationitem} from "../../../redux/Masterslices/DesignationSlice";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Designation = () => {
  const dispatch = useDispatch();
  const [isdesignationdata, setisdesignationdata] = React.useState([]);
  const [IsOpen, setIsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const getdesignation = async () => {
    try {
      setLoading(true);
      dispatch(setLoader(true));
      const response = await fetchdesignationapicall({
        params: {search, page, limit: 10},
      });
      if (response.success) {
        dispatch(setLoader(false));
        setTotalPages(response.totalPages);
        setisdesignationdata(response.result);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = React.useCallback(async (values) => {
    try {
      setIsOpen(false);
      dispatch(setLoader(true));
      const response = await createdesignationapicall(values);
      if (response.success) {
        dispatch(setLoader(false));
        dispatch(addDesignationitem(response.result));
        toast.success(response.message);
        getdesignation();
        setIsOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }, []);

  const removeDesignation = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removedesignationapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        getdesignation();
        toast.success(response.message);
      } else {
        dispatch(setLoader(false));
        toast.success(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const updateDesignation = async (value) => {
    let val = {
      id: isEdit?.Designation_Id,
      payload: value,
    };
    try {
      dispatch(setLoader(true));
      const response = await updatedesignationapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        setIsOpen(false);
        getdesignation();
      } else {
        setIsOpen(false);
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      setIsOpen(false);
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };
  const handleOpen = (value) => {
    setIsOpen(true);
    setIsEdit(value);
  };

  React.useEffect(() => {
    getdesignation();
  }, [search, page]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Designation" />

      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Designation
      </Button>

      {IsOpen && (
        <TModal
          open={IsOpen}
          title={isEdit !== null ? "Edit Designation" : "Add Designation"}
          onClose={() => {
            setIsOpen(false);
            setIsEdit(null);
          }}
        >
          <AddDesignation
            updateDesignation={updateDesignation}
            isEdit={isEdit}
            handleSubmit={handleSubmit}
          />
        </TModal>
      )}
      <DesignationTable
        removeDesignation={removeDesignation}
        handleOpen={handleOpen}
        isdesignationdata={isdesignationdata}
        setLoading={setLoading}
        loading={loading}
        setSearch={setSearch}
        search={search}
        setPage={setPage}
        page={page}
        setTotalPages={setTotalPages}
        totalPages={totalPages}
      />
    </LayoutDesign>
  );
};

export default Designation;
