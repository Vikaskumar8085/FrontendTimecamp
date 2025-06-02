import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Container, Drawer, Button, Grid2} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";
import ClientForm from "../../../Component/AdminComponents/Client/ClientForm";
import {
  createclientapicall,
  fetchclientapicall,
  removeclientapicall,
  updateclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import AddIcon from "@mui/icons-material/Add";
import ClientUploadForm from "../../../Component/AdminComponents/Client/ClientUploadForm";
import {uploadclientcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import TModal from "../../../common/Modal/TModal";
import Input from "../../../common/Input/Input";
import PhoneInput from "react-phone-input-2";
import InputPassword from "../../../common/InputPassword/InputPassword";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Client = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [Isclientdata, setIsclientdata] = useState([]);

  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClients, setTotalClients] = useState(0);
  const dispatch = useDispatch();
  // fetch client

  const fetchclientfucntion = async () => {
    try {
      const response = await fetchclientapicall({
        params: {
          search,
          page: page + 1, // Backend expects 1-based index
          limit: rowsPerPage,
        },
      });
      console.log(response, "client");

      if (response.success) {
        setTotalClients(response.totalClients);
        setIsclientdata(response.result);
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
      const response = await createclientapicall(value);
      if (response.success) {
        setIsOpen(false);
        fetchclientfucntion();
        toast.success(response?.message);
        setIsEdit(null);
        dispatch(setLoader(false));
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
      toast.success(error?.response?.data?.message);
    }
  };

  const uploadclientcsvhandlesubmit = async (value) => {
    try {
      const response = await uploadclientcsvapicall(value);
      if (response?.success) {
        console.log(response.data);
        fetchclientfucntion();
        setIsUpload(false);
        toast.success("file uploaded successfully");
      } else {
        fetchclientfucntion();
        setIsUpload(false);
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  // delete client
  const handleUpdate = async (value) => {
    try {
      let val = {
        id: isEdit.Client_Id,
        payload: value,
      };

      dispatch(setLoader(true));
      const response = await updateclientapicall(val);
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        setIsEdit(null);
        fetchclientfucntion();
        setIsOpen(false);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        setIsEdit(null);
        setIsOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const removeclientfunc = async (value) => {
    try {
      console.log(value, ">>>>>>>>>");
      dispatch(setLoader(true));
      const response = await removeclientapicall(value);
      if (response?.success) {
        dispatch(setLoader(false));
        fetchclientfucntion();
        toast.success(response?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const handleOpen = async (value) => {
    setIsEdit(value);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchclientfucntion();
  }, [search, page, rowsPerPage]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Client" />
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
        Add Client
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
        Upload Client
      </Button>
      {IsOpen && (
        <TModal
          title={isEdit !== null ? "Edit Client " : " Add Client"}
          open={IsOpen}
          onClose={() => {
            setIsEdit(null);
            setIsOpen(false);
          }}
        >
          <ClientForm
            isEdit={isEdit}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </TModal>
      )}

      {isUpload && (
        <Drawer
          open={isUpload}
          onClose={() => setIsUpload(false)}
          anchor="right"
        >
          <ClientUploadForm
            setIsUpload={setIsUpload}
            uploadclientcsvhandlesubmit={uploadclientcsvhandlesubmit}
          />
        </Drawer>
      )}
      <ClientTable
        removeclientfunc={removeclientfunc}
        handleOpen={handleOpen}
        Isclientdata={Isclientdata}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        totalClients={totalClients}
        setSearch={setSearch}
        search={search}
        page={page}
      />
    </LayoutDesign>
  );
};

export default Client;
