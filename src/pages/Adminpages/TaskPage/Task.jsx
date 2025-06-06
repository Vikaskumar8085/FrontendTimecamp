import React, { useEffect, useState } from "react";
import { TablePagination, Chip } from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Button, Drawer } from "@mui/material";
import AddIcons from "@mui/icons-material/Add";
import TaskCreationForm from "../../../Component/AdminComponents/Task/TaskCreationForm";
import apiInstance from "../../../ApiInstance/apiInstance";
import {
  addTaskapicall,
  fetchProjectwithmilestonesapicall,
} from "../../../ApiServices/TaskApiServices";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/LoaderSlices/LoaderSlices";
import { Link } from "react-router-dom";
import TModal from "../../../common/Modal/TModal";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../../common/EmptyFolder/Empty";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "../../../common/Pagination/Pagination";
const Task = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  const dispatch = useDispatch();
  const fetchprojectwithmilestonefunc = async () => {
    try {
      const response = await fetchProjectwithmilestonesapicall();
      if (response.success) {
        setIsprojectmilestonedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchTasks = async (currentPage) => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/fetch-tasks?page=${currentPage}&limit=6`
      );
      if (response?.data?.success) {
        setTasks(response.data.result);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const TaskHandlesubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await addTaskapicall(values);
      if (response.success) {
        setIsOpen(false);
        dispatch(setLoader(false));
        fetchTasks();
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    fetchTasks(page);
    fetchprojectwithmilestonefunc();
  }, [page]);

  return (
    <LayoutDesign>
      <div>
        <BreadCrumb pageName="Task" />
        <Button
          onClick={() => setIsOpen(true)}
          startIcon={<AddIcons />}
          sx={{
            background: "#6560f0",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Add Task
        </Button>

        {IsOpen && (
          <TModal
            title={"add Task"}
            open={IsOpen}
            onClose={() => setIsOpen(false)}
          >
            <TaskCreationForm
              TaskHandlesubmit={TaskHandlesubmit}
              Isprojectmilestonedata={Isprojectmilestonedata}
            />
          </TModal>
        )}

        {tasks?.length > 0 ? (
          <>
            <table className="table_Container">
              <thead className="table_head">
                <tr className="head_row">
                  <th className="table_head_data">Id</th>
                  <th className="table_head_data">Task Name</th>
                  <th className="table_head_data">Project Name </th>
                  <th className="table_head_data">Milestone </th>
                  <th className="table_head_data">Priority </th>
                  <th className="table_head_data">Start Date </th>
                  <th className="table_head_data">End Date </th>
                  <th className="table_head_data">Resource Name </th>
                  <th className="table_head_data">Status </th>
                  <th className="table_head_data">Attachment </th>
                  <th className="table_head_data">Action </th>
                </tr>
              </thead>
              <tbody className="table_body">
                {tasks?.map((item, index) => {
                  return (
                    <>
                      <tr className="body_row" key={index}>
                        <td className="table_data">{index + 1}</td>
                        <td className="table_data">{item.Task_Name}</td>
                        <td className="table_data">{item.ProjectName}</td>
                        <td className="table_data">{item.MilestoneName}</td>
                        <td className="table_data">
                          {new Date(item.StartDate).toLocaleDateString()}
                        </td>
                        <td className="table_data">
                          {new Date(item.EndDate).toLocaleDateString()}
                        </td>
                        <td className="table_data">{item.Priority}</td>

                        <td className="table_data">{item.ResourceName}</td>

                        <td className="table_data">
                          {
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
                          }
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
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <Empty />
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </LayoutDesign>
  );
};

export default Task;
