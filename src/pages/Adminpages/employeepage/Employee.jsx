import React, {useState} from "react";
import {Drawer, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import {
  addemployeeapicall,
  fetchemployeeapicall,
  updateEmployeeapicall,
} from "../../../ApiServices/AdminApiServices/Employee";
import EmployeeTable from "../../../Component/AdminComponents/Employee/EmployeeTable";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import EmployeeUploadForm from "../../../Component/AdminComponents/Employee/EmployeeUploadForm";
import {uploademployeecsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import EmployeeForm from "../../../Component/AdminComponents/Employee/EmployeeForm";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import TModal from "../../../common/Modal/TModal";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Employee = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [IsEmployeeData, setIsEmployeeData] = useState([]);
  const [IsOpen, setIsOpen] = React.useState(false);
  const [IsEdit, setIsEdit] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // Page starts from 0 in TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();
  const getemployee = async () => {
    try {
      const response = await fetchemployeeapicall({
        params: {
          search,
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsEmployeeData(response.result);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await addemployeeapicall(value);
      console.log(response, "response data");
      if (response.success) {
        setIsOpen(false);
        getemployee();
        dispatch(setLoader(false));
      } else {
        setIsOpen(false);
        dispatch(setLoader(false));
        toast.error(response?.message || "Something went wrong.");
      }
      console.log(value, "values");
    } catch (error) {
      dispatch(setLoader(true));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // upload handle submit

  const uploadhandlesubmit = async (value) => {
    try {
      const response = await uploademployeecsvapicall(value);

      alert("File uploaded successfully!");
      console.log(response.data);
      getemployee();
      setIsUpload(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  const updateEmployeeFunc = async (value) => {
    dispatch(setLoader(true));
    try {
      const val = {
        id: IsEdit.staff_Id,
        payload: value,
      };
      const response = await updateEmployeeapicall(val);
      if (response.success) {
        setIsOpen(false);
        getemployee();
        dispatch(setLoader(false));
        toast.success(response?.message);
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

  React.useEffect(() => {
    getemployee();
  }, [search, page, rowsPerPage]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee" />

      <Button
        onClick={() => {
          setIsOpen(true);
          setIsEdit(null);
        }}
        startIcon={<AddIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Create Employee
      </Button>
      <Button
        onClick={() => setIsUpload(true)}
        startIcon={<FileUploadOutlinedIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Employee
      </Button>

      {/* create employee */}

      {IsOpen && (
        <TModal
          open={IsOpen}
          title={IsEdit ? "Edit Employee" : "Add Employee"}
          onClose={() => {
            setIsOpen(false), setIsEdit(null);
          }}
          anchor="right"
        >
          <EmployeeForm
            IsEdit={IsEdit}
            handleSubmit={handleSubmit}
            updateEmployeeFunc={updateEmployeeFunc}
          />
        </TModal>
      )}
      {/* create employee */}

      {isUpload && (
        <Drawer
          open={isUpload}
          onClose={() => setIsUpload(false)}
          anchor="right"
        >
          <EmployeeUploadForm
            setIsUpload={setIsUpload}
            uploadhandlesubmit={uploadhandlesubmit}
          />
        </Drawer>
      )}

      <EmployeeTable
        setIsEdit={setIsEdit}
        setisOpen={setIsOpen}
        IsEmployeeData={IsEmployeeData}
        setLoading={setLoading}
        loading={loading}
        setSearch={setSearch}
        search={search}
        setPage={setPage}
        page={page}
        setTotalCount={setTotalCount}
        totalCount={totalCount}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
      />
    </LayoutDesign>
  );
};

export default Employee;
