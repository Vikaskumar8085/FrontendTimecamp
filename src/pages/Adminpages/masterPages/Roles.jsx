import * as React from "react";
import Button from "@mui/material/Button";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Drawer, TextField} from "@mui/material";
import {useFormik} from "formik";
import RolesTable from "../../../Component/MasterComponent/Roles/RolesTable";
import {
  createrolesapicall,
  fetchroleapicall,
  removeroleapicall,
  updateroleapicall,
} from "../../../ApiServices/MasterApiServices/Roles";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import AddRoles from "../../../Component/MasterComponent/Roles/AddRoles";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRoledata, setIsRoledata] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const dispatch = useDispatch();

  const getroles = async () => {
    try {
      setLoading(true);
      dispatch(setLoader(true));
      const response = await fetchroleapicall({
        params: {search, page, limit: 10},
      });
      if (response.success) {
        setIsRoledata(response.result);
        dispatch(setLoader(false));
        setTotalPages(response.totalPages);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createrolesapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        setIsModalOpen(false);
        getroles();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const removeRoles = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removeroleapicall(value);
      if (response.success) {
        getroles();
        dispatch(setLoader(false));
        toast.success(response.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleupdate = async (values) => {
    let val = {
      id: isEdit.RoleId,
      payload: values,
    };
    try {
      dispatch(setLoader(true));
      const response = await updateroleapicall(val);
      if (response.success) {
        toast.success(response.message);
        getroles();
        setIsModalOpen(false);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setIsModalOpen(false);

        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleOpen = (value) => {
    setIsModalOpen(true);
    setIsEdit(value);
  };
  React.useEffect(() => {
    getroles();
  }, [search, page]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Roles" />

        <Button
          onClick={() => setIsModalOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            background: "#6560f0",
            padding: "8px 10px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Add Roles
        </Button>

        {isModalOpen ? (
          <TModal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsEdit(null);
            }}
            title={isEdit !== null ? "Edit Role" : "Add Role"}
          >
            <AddRoles
              handleupdate={handleupdate}
              isEdit={isEdit}
              handleSubmit={handleSubmit}
            />
          </TModal>
        ) : null}

        <RolesTable
          handleOpen={handleOpen}
          removeRoles={removeRoles}
          isRoledata={isRoledata}
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
    </>
  );
};

export default Roles;
