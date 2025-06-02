import {Button, Container, Drawer, Input, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import TModal from "../../../common/Modal/TModal";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import DepartmentTable from "../../../Component/MasterComponent/Department/DepartmentTable";
import AddIcon from "@mui/icons-material/Add";

import {
  createdepartmentapicall,
  fetchdepartmentapicall,
  removedepartmentapicall,
  updatedepartmentapicall,
} from "../../../ApiServices/MasterApiServices/Department";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddDepartment from "../../../Component/MasterComponent/Department/AddDepartment";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Department = () => {
  const dispatch = useDispatch();
  const [isdepartmentdata, setIsdepartmentdata] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const getdepartment = async () => {
    try {
      setLoading(true);
      const response = await fetchdepartmentapicall({
        params: {search, page, limit: 10},
      });
      if (response.success) {
        setIsdepartmentdata(response.result);
        setTotalPages(response.totalPages);
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
      const response = await createdepartmentapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        getdepartment();
        setIsOpen(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data.message || "something went wrong");
    }
  };

  const deleteDepartment = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removedepartmentapicall(value);
      if (response.success) {
        getdepartment();
        toast.success(response.message);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const updatedepartment = async (value) => {
    let val = {
      id: isEdit?.Department_Id,
      payload: value,
    };
    try {
      dispatch(setLoader(true));
      const response = await updatedepartmentapicall(val);
      if (response.success) {
        dispatch(setLoader(false));
        setIsOpen(false);
        toast?.success(response.message);
        getdepartment();
      } else {
        dispatch(setLoader(false));
        setIsOpen(false);
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsOpen(false);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleOpen = (value) => {
    setIsOpen(true);
    setIsEdit(value);
  };
  useEffect(() => {
    getdepartment();
  }, [search, page]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Department" />

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
        Add Department
      </Button>

      {IsOpen && (
        <TModal
          open={IsOpen}
          title={isEdit !== null ? "Edit Department" : "Add Department"}
          onClose={() => {
            setIsOpen(false);
            setIsEdit(null);
          }}
        >
          <AddDepartment
            updatedepartment={updatedepartment}
            isEdit={isEdit}
            handleSubmit={handleSubmit}
          />
        </TModal>
      )}
      <DepartmentTable
        handleOpen={handleOpen}
        deleteDepartment={deleteDepartment}
        isdepartmentdata={isdepartmentdata}
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

export default Department;
