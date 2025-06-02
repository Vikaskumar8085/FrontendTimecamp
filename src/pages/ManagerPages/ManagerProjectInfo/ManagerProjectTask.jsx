import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Box, Button, Drawer} from "@mui/material";
import ManagerProjectMilestoneForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectMilestoneForm";
import ManagerProjectTaskForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskForm";
import ManagerProjectTaskUploadForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskUploadForm";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import TModal from "../../../common/Modal/TModal";
import InputSearch from "../../../common/InputSearch/InputSearch";
import Pagination from "../../../common/Pagination/Pagination";
import Empty from "../../../common/EmptyFolder/Empty";
import Employeemilestone from "../../../Component/EmployeeComponents/EmployeeMilestone/Employeemilestone";
import Managermilestone from "../../../Component/ManagerComponents/Managermilestone/Managermilestone";
import {CheckCircle} from "lucide-react";
import moment from "moment";
const ManagerTask = ({
  isrecentactivity,
  ismilestonedata,
  isallotedtask,
  handleaddtask,
  isManagerprojecttask,
  handleSubmitmilestone,
  Ismilestone,
  isMilestonoeresourcesdata,
  IsOpen,
  setIsOpen,
  IsMilestoneOpen,
  setIsMilestoneOpen,
}) => {
  const [IsUploadTask, setIsUploadTask] = useState(false);

  return (
    <>
      <BreadCrumb pageName="Manager Task" />

      <div>
        <Button
          onClick={() => setIsMilestoneOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Milestone
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Task
        </Button>
        <Button
          onClick={() => setIsUploadTask(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Upload Task
        </Button>
      </div>

      {IsOpen && (
        <TModal
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          title="Add Task"
        >
          <ManagerProjectTaskForm
            handleaddtask={handleaddtask}
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
          />
        </TModal>
      )}

      {IsMilestoneOpen && (
        <TModal
          open={IsMilestoneOpen}
          onClose={() => setIsMilestoneOpen(false)}
          title="Add Milestone"
        >
          <ManagerProjectMilestoneForm
            handleSubmitmilestone={handleSubmitmilestone}
          />
        </TModal>
      )}

      {IsUploadTask && (
        <TModal
          open={IsUploadTask}
          onClose={() => {
            setIsUploadTask(false);
          }}
          title="Upload Task"
        >
          <ManagerProjectTaskUploadForm />
        </TModal>
      )}

      {/* <Grid2 container spacing={2}>
        <Grid2 size={{sm: 12, md: 6}}>
          <Box sx={{height: "300px", overflow: "auto"}}>
            {Ismilestone.length > 0 ? (
              Ismilestone.map((item, index) => (
                <Card key={index} sx={{mb: 1, p: 1, position: "relative"}}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                    }}
                  ></Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.Name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.Description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography color="textSecondary">
                No milestones available
              </Typography>
            )}
          </Box>
        </Grid2>
      </Grid2> */}
      <Grid2 container spacing={4} sx={{my: 3}}>
        <Grid2
          size={{md: 4, lg: 4, sm: 12}}
          sx={{height: "320px", overflow: "auto"}}
          className="client_project_task_header"
        >
          {!isrecentactivity.length ? (
            <Empty />
          ) : (
            <div className="recent-activity">
              <h3 className="title">Recent Activity</h3>
              <div className="activity-list">
                {isrecentactivity.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="avatar">
                      {activity.Photos?.[0] ? (
                        <img src={activity.Photos?.[0]} alt="avatar" />
                      ) : (
                        <span className="initial">
                          {activity.DesignationName}
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
          size={{md: 4, lg: 4, sm: 12}}
          sx={{height: "320px", overflow: "auto"}}
          className="client_project_task_header"
        >
          {!isallotedtask.length ? (
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
          size={{md: 4, lg: 4, sm: 12}}
          sx={{height: "320px", overflow: "auto"}}
        >
          <Managermilestone milestones={ismilestonedata} />
          {!ismilestonedata.length && <Empty />}
        </Grid2>
      </Grid2>

      <div
        style={{
          display: "block",
          overflow: "hidden",
          position: "relative",
          margin: "10px 0px",
        }}
        className="client_header_container"
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div className="left_div">
            <Button>Sort</Button>
          </div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
      </div>

      {isManagerprojecttask.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  <b>Task Name</b>
                </TableCell>
                <TableCell>
                  <b>Priority</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>End Date</b>
                </TableCell>
                <TableCell>
                  <b>Task Description</b>
                </TableCell>
                <TableCell>
                  <b> Description</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isManagerprojecttask.map((item) => {
                return item.findTasks.map((task, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.Task_Name}</TableCell>
                      <TableCell>{task.Priority}</TableCell>
                      <TableCell>
                        {new Date(task.StartDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(task.EndDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{task.Task_description}</TableCell>
                      <TableCell>{task.Description}</TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No timesheet data found.</Typography>
      )}

      <Pagination />
    </>
  );
};

export default ManagerTask;
