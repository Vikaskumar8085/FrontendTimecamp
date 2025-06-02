import {Chip, Button, Drawer, Grid2} from "@mui/material";
import {Link} from "react-router-dom";
import {CheckCircle} from "lucide-react";
import React, {useCallback, useEffect, useState} from "react";
import MilestoneForm from "./MilestoneForm";
import apiInstance from "../../../../ApiInstance/apiInstance";
import UploadTask from "../../../../Component/AdminComponents/Task/UploadTask";
import AddProjectTask from "../../../../Component/AdminComponents/Project/AddProjectTask";
import MilestoneList from "../../../../Component/AdminComponents/Project/ProjecTaskComponent/MilestoneList";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../../redux/LoaderSlices/LoaderSlices";
import TModal from "../../../../common/Modal/TModal";
import Empty from "../../../../common/EmptyFolder/Empty";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "../../../../common/Pagination/Pagination";
import InputSearch from "../../../../common/InputSearch/InputSearch";

const ProjectTask = ({id}) => {
  let dispatch = useDispatch();
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsMilestoneOpen, setIsMieStoneOpen] = useState(false);
  const [IsUploadTaskOpen, setIsUploadTaskOpen] = useState(false);
  const [Ismilestonedata, setIsmilestonedata] = useState([]);
  const [isMilestonoeresourcesdata, setIsMilestonoeresourcesdata] = useState(
    []
  );
  const [isrecenteTaskdata, setIsRecentTask] = useState([]);
  const [isAllotedMemberdata, setIsallotedMemberdata] = useState([]);
  // for pagination and searching

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit] = useState(pageSize);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // for pagination and searching
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // searching
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: pageSize,
        search: debouncedSearch,
      });
      const response = await apiInstance.get(
        `/v1/admin/fetch-project-task/${id}?${params.toString()}`
      );
      if (response?.data?.success) {
        setTasks(response.data.result);
        setTotalPages(response?.data.totalPages);
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  }, [page, limit, debouncedSearch, id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1); // reset page on search
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // reset to first page on page size change
  }, []);

  // task functions

  const fetchmilestonewithresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone-resources/${id}`
      );
      if (response.data.success) {
        setIsMilestonoeresourcesdata(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchmilestonefunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone/${id}`
      );
      if (response.data.success) {
        setIsmilestonedata(response.data.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await apiInstance.post(
        `/v2/milestone/create-milestone/${id}`,
        values.milestones
      );
      console.log(response);
      if (response.data.success) {
        console.log(response);
        fetchmilestonefunc();
        fetchmilestonewithresourcesfunc();
        setIsMieStoneOpen(false);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const TaskHandleSubmit = async (value) => {
    try {
      const response = await apiInstance.post(
        `/v1/admin/create-task/${id}`,
        value
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
        setIsTaskOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch alloted task members
  const fetchallotedtaskmemebersfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/fetch-alloted-task-memebrs/${id}`
      );

      if (response.data.success) {
        setIsallotedMemberdata(response?.data?.result);
      }
      console.log(response, "data task alloted");
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch alloted task members

  const uploadTaskhandlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.post(
        `/v1/csv-upload/task-csv-upload/${id}`,
        value
      );
      dispatch(setLoader(false));

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
        toast.success(response.data.message);
        setIsUploadTaskOpen(false);
        dispatch(setLoader(false));
      } else {
        toast.error(response.data.message);
        toast.success(response.data.message);
        setIsUploadTaskOpen(false);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsUploadTaskOpen(false);
    }
  };

  const fetchrecentactivityfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/fetch-recent-activities/${id}`
      );
      setIsRecentTask(response?.data?.result);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    fetchallotedtaskmemebersfunc();
    fetchmilestonefunc();
    fetchmilestonewithresourcesfunc();

    fetchrecentactivityfunc();
  }, [0]);

  return (
    <>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsTaskOpen(true)}
      >
        Add Task
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsMieStoneOpen(true)}
      >
        Add MileStone
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsUploadTaskOpen(true)}
      >
        Upload Task
      </Button>

      {IsTaskOpen && (
        <TModal
          open={IsTaskOpen}
          onClose={() => setIsTaskOpen(false)}
          title={"Add Task"}
        >
          <AddProjectTask
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
            TaskHandleSubmit={TaskHandleSubmit}
          />
        </TModal>
      )}

      {IsMilestoneOpen && (
        <TModal
          open={IsMilestoneOpen}
          onClose={() => setIsMieStoneOpen(false)}
          title={"Add MileStone"}
        >
          <MilestoneForm handleSubmit={handleSubmit} />
        </TModal>
      )}

      {IsUploadTaskOpen && (
        <Drawer
          open={IsUploadTaskOpen}
          onClose={() => setIsUploadTaskOpen(false)}
          anchor="right"
        >
          <UploadTask
            setIsUploadTaskOpen={setIsUploadTaskOpen}
            uploadTaskhandlesubmit={uploadTaskhandlesubmit}
          />
        </Drawer>
      )}

      <div>
        <Grid2 container spacing={2} sx={{my: 2}}>
          <Grid2
            size={{sm: 6, xs: 12, md: 4, lg: 4}}
            sx={{height: "300px", overflow: "auto"}}
          >
            <MilestoneList milestones={Ismilestonedata} />
          </Grid2>
          <Grid2
            size={{sm: 6, xs: 12, md: 4, lg: 4}}
            sx={{height: "300px", overflow: "auto"}}
          >
            <div className="recent-activity">
              <h3 className="title">Recent Activity</h3>
              <div className="activity-list">
                {isrecenteTaskdata.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="avatar">
                      {activity.Photos?.[0] ? (
                        <img src={activity.Photos?.[0]} alt="avatar" />
                      ) : (
                        <span className="initial">{activity.Task_Name}</span>
                      )}
                    </div>
                    <div className="activity-content">
                      <div className="message">{activity.Message}</div>
                      <div className="time">
                        {moment(activity.updatedAt).fromNow()}
                      </div>
                    </div>
                    <CheckCircle className="icon" size={20} color="#00C49F" />
                  </div>
                ))}
                {!isrecenteTaskdata.length && <Empty />}
              </div>
            </div>
          </Grid2>
          <Grid2
            size={{sm: 12, md: 4, xs: 12, lg: 4}}
            sx={{height: "300px", overflow: "auto"}}
          >
            <div className="task-members-wrapper" style={{background: "white"}}>
              <h3 className="title">Allocated Task Members</h3>
              <div className="task-members-scroll">
                {isAllotedMemberdata.map((item, index) => (
                  <div className="task-member" key={index}>
                    <img
                      src={item?.Photos?.[0]}
                      alt="Profile"
                      className="profile-img"
                    />
                    <div className="member-info">
                      <div className="name">
                        {item.FirstName} {item.LastName}
                      </div>
                      <div className="designation">
                        {item.DesignationName || "Role Unknown"}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{background: "white"}}>
                  {!isAllotedMemberdata.length && <Empty />}
                </div>
              </div>
            </div>
          </Grid2>
        </Grid2>

        <h1>Assigned Task</h1>
        {/* searching  */}
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div className="left_div">{/* <Button>Sort</Button> */}</div>
          <div className="right_div">
            <InputSearch value={search} onChange={handleSearchChange} />
          </div>
        </div>
        {/* searching */}
        {/* task  table */}
        {loading ? (
          <div>Loading...</div>
        ) : tasks.length > 0 ? (
          <>
            <table className="table_Container">
              <thead className="table_head">
                <tr className="head_row">
                  {/* Table headers */}
                  <th className="table_head_data">Id</th>
                  <th className="table_head_data">Task Name</th>
                  <th className="table_head_data">Project Name</th>
                  <th className="table_head_data">Milestone</th>
                  <th className="table_head_data">Priority</th>
                  <th className="table_head_data">Start Date</th>
                  <th className="table_head_data">End Date</th>
                  <th className="table_head_data">Resource Name</th>
                  <th className="table_head_data">Status</th>
                  <th className="table_head_data">Attachment</th>
                  <th className="table_head_data">Action</th>
                </tr>
              </thead>
              <tbody className="table_body">
                {tasks.map((item, index) => (
                  <tr className="body_row" key={item._id || index}>
                    <td className="table_data">{`T${
                      (page - 1) * pageSize + index + 1
                    }`}</td>
                    <td className="table_data">{item.Task_Name}</td>
                    <td className="table_data">{item.ProjectName}</td>
                    <td className="table_data">{item.MilestoneName}</td>
                    <td className="table_data">{item.Priority}</td>
                    <td className="table_data">
                      {new Date(item.StartDate).toLocaleDateString()}
                    </td>
                    <td className="table_data">
                      {new Date(item.EndDate).toLocaleDateString()}
                    </td>
                    <td className="table_data">{item.ResourceName}</td>
                    <td className="table_data">
                      <Chip
                        label={item.Status || "Unknown"}
                        color={
                          item.Status === "COMPLETED"
                            ? "success"
                            : item.Status === "INPROGRESS"
                            ? "primary"
                            : item.Status === "P"
                            ? "warning"
                            : "default"
                        }
                      />
                    </td>
                    <td className="table_data">
                      {item.Attachment && (
                        <a
                          href={item.Attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          attachment
                        </a>
                      )}
                    </td>
                    <td className="table_data">
                      <Link to={`/task-view/${item.task_Id}`}>
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default ProjectTask;
