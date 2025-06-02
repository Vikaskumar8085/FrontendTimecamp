import React, {useEffect} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import {
  createadminapicall,
  editadminapicall,
  fetchadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import AddIcon from "@mui/icons-material/Add";
import UserList from "../../../Component/AdminComponents/Admin/UserList";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import AdminForm from "../../../Component/AdminComponents/Admin/AdminForm";
// validation
// validation

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAdmindata, setIsAdmindata] = React.useState([]);
  const [IsEdit, setIsEdit] = React.useState(null);
  // console.log("isEdit ?????????????", IsEdit?.Email ?? "no data");
  const dispatch = useDispatch();
  // fetch admin

  const fetchadmin = async () => {
    try {
      const response = await fetchadminapicall();

      if (response.success) {
        setIsAdmindata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleEdit = (value) => {
    setIsEdit(value);
    setIsModalOpen(true);
  };
  // create admin
  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createadminapicall(value);

      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchadmin();
        setIsModalOpen(false);
      } else {
        fetchadmin();
        dispatch(setLoader(false));
        toast.error(response?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsModalOpen(false);
    }
  };

  const updatehandle = async (values) => {
    try {
      
      const val = {
        id: IsEdit?.user_id,
        payload: values,
      };
      dispatch(setLoader(true));
      console.log(val,"vlu")
      const response = await editadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        setIsModalOpen(false);
        fetchadmin();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
      console.log(response, "response");
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    fetchadmin();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Admin" />
      <Button
        onClick={() => setIsModalOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Add Admin
      </Button>

      {isModalOpen && (
        <>
          <TModal
            open={isModalOpen}
            onClose={() => {
              setIsEdit(null);
              setIsModalOpen(false);
            }}
            title={IsEdit ? "Edit Admin" : "Add Admin"}
          >
            <AdminForm
              setIsEdit={setIsEdit}
              IsEdit={IsEdit}
              updatehandle={updatehandle}
              handleSubmit={handleSubmit}
            />
          </TModal>
        </>
      )}

      <UserList handleEdit={handleEdit} users={isAdmindata} />
    </LayoutDesign>
  );
};

export default Admin;
