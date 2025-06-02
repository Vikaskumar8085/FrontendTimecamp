import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { fetchemployeeprojecttaskapicall } from "../../../ApiServices/EmployeeApiservices/Employee";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Pagination from "../../../common/Pagination/Pagination";
import TaskProgress from "../../TaskProgress";
import RecentActivity from "../../../common/RecentActivity/RecentActivity";
import InputSearch from "../../../common/InputSearch/InputSearch";
import apiInstance from "../../../ApiInstance/apiInstance";
import Employeemilestone from "../../../Component/EmployeeComponents/EmployeeMilestone/Employeemilestone";
import Empty from "../../../common/EmptyFolder/Empty";
const EmployeeProjectTask = ({ id }) => {
  const [IsEmployeeProjectTaskdata, setIsEmployeeProjectTaskdata] = useState(
    []
  );

  const [Isemployeeallotedtask, setemployeeallotedtask] = useState([]);
  const [isemployeeRecentActivity, setEmployeeRecentActivity] = useState([]);
  const [isemployeemilestonedata, setEmployeemilestonedata] = useState([]);
  console.log(Isemployeeallotedtask);
  const fetchEmployeeProjectTaskFunc = useCallback(async () => {
    try {
      const response = await fetchemployeeprojecttaskapicall(id);
      if (response.success) {
        setIsEmployeeProjectTaskdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  const fetchemployeetaskallotedfunc = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-alloted-task/${id}`
      );
      if (response?.data?.success) {
        setemployeeallotedtask(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  const fetchEmployeeRecentActivitiesfunc = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-recent-activities/${id}`
      );
      if (response?.data?.success) {
        setEmployeeRecentActivity(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  const fetchEmployeeTaskProjecss = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/employee/fetch-employee-milestone-project/${id}`
      );
      if (response?.data?.success) {
        setEmployeemilestonedata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);


  
  useEffect(() => {
    fetchEmployeeProjectTaskFunc();
    fetchemployeetaskallotedfunc();
    fetchEmployeeRecentActivitiesfunc();
    fetchEmployeeTaskProjecss();
  }, [
    fetchEmployeeProjectTaskFunc,
    fetchemployeetaskallotedfunc,
    fetchEmployeeRecentActivitiesfunc,
    fetchEmployeeTaskProjecss,
  ]);

  return (
    <div>
      <>
        <BreadCrumb pageName="Employee Task" />
        <Grid2 container spacing={4} sx={{ my: 3 }}>
          <Grid2
            size={{ md: 4, lg: 4, sm: 12 }}
            sx={{ height: "320px", overflow: "auto" }}
            className="client_project_task_header"
          >
            {!isemployeeRecentActivity.length ? (
              <Empty />
            ) : (
              <div className="recent-activity">
                <h3 className="title">Recent Activity</h3>
                <div className="activity-list">
                  {isemployeeRecentActivity.map((activity, index) => (
                    <div className="activity-item" key={index}>
                      <div className="avatar">
                        {activity.Photos?.[0] ? (
                          <img src={activity.Photos?.[0]} alt="avatar" />
                        ) : (
                          <span className="initial">
                            {/* {activity.DesignationName} */}
                          </span>
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
                </div>
              </div>
            )}
          </Grid2>
          <Grid2
            size={{ md: 4, lg: 4, sm: 12 }}
            sx={{ height: "320px", overflow: "auto" }}
            className="client_project_task_header"
          >
            {!Isemployeeallotedtask.length ? (
              <Empty />
            ) : (
              <div className="task-members-wrapper">
                <h3 className="title">Allocated Task Members</h3>
                <div className="task-members-scroll">
                  {Isemployeeallotedtask.map((item, index) => (
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
                          {item.DesignationName || "designation Unknown"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Grid2>
          <Grid2
            size={{ md: 4, lg: 4, sm: 12 }}
            sx={{ height: "320px", overflow: "auto" }}
          >
            <Employeemilestone milestones={isemployeemilestonedata} />
            {!isemployeemilestonedata.length && <Empty />}
          </Grid2>
        </Grid2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px",
          }}
        >
          <div className="left_div">{/* <Button>Sort</Button> */}</div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
        <TableContainer
          component={Paper}
          sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
              <TableRow>
                <TableCell>
                  <strong>Task Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Milestone ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Priority</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell>
                  <strong>End Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Estimated Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Resource ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Task Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Attachment</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsEmployeeProjectTaskdata.flatMap((item) =>
                item?.findTasks?.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.Task_Name}</TableCell>
                    <TableCell>{task.MilestoneId}</TableCell>
                    <TableCell>{task.Priority}</TableCell>
                    <TableCell>{task.Status}</TableCell>
                    <TableCell>{task.StartDate}</TableCell>
                    <TableCell>{task.EndDate}</TableCell>
                    <TableCell>{task.Estimated_Time} hrs</TableCell>
                    <TableCell>{task.Resource_Id}</TableCell>
                    <TableCell>{task.Task_description || "N/A"}</TableCell>
                    <TableCell>
                      {task.Attachment ? (
                        <a
                          href={`path/to/attachments/${task.Attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Attachment
                        </a>
                      ) : (
                        "No Attachment"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        style={{ textDecoration: "none", color: "#2c3e50" }}
                        to={`/employee/taskinfo/${task.task_Id}`}
                      >
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination />
      </>
    </div>
  );
};

export default EmployeeProjectTask;
