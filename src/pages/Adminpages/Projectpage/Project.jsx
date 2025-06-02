import React, {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import ProjectForm from "../../../Component/AdminComponents/Project/ProjectForm";
import UploadProjectForm from "../../../Component/AdminComponents/Project/UploadProjectForm";
import AddIcons from "@mui/icons-material/Add";
import {
  createprojectapicall,
  fetchprojectapicall,
  removeprojectapicall,
  updateprojectapicall,
} from "../../../ApiServices/ProjectApiServices";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ProjectTable from "../../../Component/AdminComponents/Project/ProjectTable";
import ProjectUploadForm from "../../../Component/AdminComponents/Project/ProjectUploadForm";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import {uploadprojectcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../../common/Modal/TModal";

const Project = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectdata, setIsProjectdata] = useState([]);
  const [IsProjectUploadModelOpen, setIsProjectUploadModelOpen] =
    useState(false);
  const [IsEdit, setIsEdit] = useState(null);
  const dispatch = useDispatch();
  // project data
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // project data

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await createprojectapicall(values);

      if (response.success) {
        setIsModalOpen(false);
        toast.success(response?.message);
        getProjectapicall();
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const getProjectapicall = async () => {
    try {
      setLoading(true);
      const response = await fetchprojectapicall({
        params: {search, page, limit},
      });
      if (response.success) {
        setIsProjectdata(response.result || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadhandlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await uploadprojectcsvapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        getProjectapicall();
        setIsProjectUploadModelOpen(false);
        toast.success(response.message);
      } else {
        dispatch(setLoader(false));
        setIsProjectUploadModelOpen(false);
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsProjectUploadModelOpen(false);
      dispatch(setLoader(false));
    }
  };

  const handleDelete = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await removeprojectapicall(value);
      if (response?.success) {
        dispatch(setLoader(false));
        getProjectapicall();
        toast.success(response?.message);
      } else {
        dispatch(setLoader(false));
        getProjectapicall();
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const UpdateHandleProject = async (value) => {
    try {
      const val = {
        id: IsEdit?.ProjectId,
        payload: value,
      };
      console.log(val, "values update");

      dispatch(setLoader(true));
      const response = await updateprojectapicall(val);

      if (response?.success) {
        setIsModalOpen(false);
        getProjectapicall();
        dispatch(setLoader(false));
      } else {
        toast.success(response?.message);
        setIsModalOpen(false);
        dispatch(setLoader(true));
        getProjectapicall();
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };
  useEffect(() => {
    getProjectapicall();
  }, [page, search, limit]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Projects" />
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setIsEdit(null);
        }}
        startIcon={<AddIcons />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Project
      </Button>
      <Button
        onClick={() => setIsProjectUploadModelOpen(true)}
        startIcon={<FileUploadIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Projects
      </Button>

      {isModalOpen ? (
        <TModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEdit(null);
          }}
          title={IsEdit ? "Edit Project" : "Add Project"}
        >
          <ProjectForm
            UpdateHandleProject={UpdateHandleProject}
            IsEdit={IsEdit}
            handleSubmit={handleSubmit}
          />
        </TModal>
      ) : null}

      {IsProjectUploadModelOpen ? (
        <Drawer
          open={IsProjectUploadModelOpen}
          onClose={() => setIsProjectUploadModelOpen(false)}
          anchor="right"
        >
          <ProjectUploadForm
            setIsProjectUploadModelOpen={setIsProjectUploadModelOpen}
            uploadhandlesubmit={uploadhandlesubmit}
          />
        </Drawer>
      ) : null}

      <ProjectTable
        setIsModalOpen={setIsModalOpen}
        setIsEdit={setIsEdit}
        isProjectdata={isProjectdata}
        setSearch={setSearch}
        search={search}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        limit={limit}
        handleDelete={handleDelete}
        loading={loading}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </LayoutDesign>
  );
};

export default Project;
