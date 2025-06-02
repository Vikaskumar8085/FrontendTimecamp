import React from "react";
import {Grid2} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Link} from "react-router-dom";
import Empty from "../../../common/EmptyFolder/Empty";
import Pagination from "../../../common/Pagination/Pagination";
import {CheckCircle} from "lucide-react";
import InputSearch from "../../../common/InputSearch/InputSearch";
import moment from "moment";
import Milestone from "../../../Component/ClientComponent/milestone/Milestone";
const ClientProjectTask = ({
  isRecentactivity,
  isclinettaskinfodata,
  istaskMembers,
  ismilestonelist,
}) => {
  return (
    <div>
      {/* <BreadCrumb pageName="Client Project Task" /> */}

      <div className="client_project_task_wrapper">
        <Grid2 container spacing={2}>
          <Grid2
            size={{md: 4, lg: 4, sm: 12}}
            sx={{height: "350px", overflow: "auto"}}
            className="client_project_task_header"
          >
            <Milestone milestones={ismilestonelist} />
            {!ismilestonelist.length && <Empty />}
          </Grid2>
          <Grid2
            size={{md: 4, lg: 4, sm: 12}}
            sx={{height: "350px", overflow: "auto"}}
            className="client_project_task_header"
          >
            <div className="recent-activity">
              <h3 className="title">Recent Activity</h3>
              <div className="activity-list">
                {isRecentactivity.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="avatar">
                      {activity.Photos?.[0] ? (
                        <img src={activity.Photos?.[0]} alt="avatar" />
                      ) : (
                        <span className="initial">{activity.initial}</span>
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
                {!isRecentactivity.length && <Empty />}
              </div>
            </div>
          </Grid2>
          <Grid2
            size={{md: 4, lg: 4, sm: 12}}
            className="client_project_task_header"
            sx={{height: "350px", overflow: "auto"}}
          >
            <div className="task-members-wrapper">
              <h3 className="title">Allocated Task Members</h3>
              <div className="task-members-scroll">
                {istaskMembers.map((item, index) => (
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
              </div>
            </div>
          </Grid2>
        </Grid2>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className="left_div">{/* <Button>Sort</Button> */}</div>
        <div className="right_div">
          <InputSearch />
        </div>
      </div>

      {isclinettaskinfodata?.length > 0 ? (
        <>
          <table className="table_Container">
            <thead className="table_head">
              <tr className="head_row">
                <th className="table_head_data">Id</th>
                <th className="table_head_data">Task Name</th>
                <th className="table_head_data">Task Description </th>
                <th className="table_head_data">Priority </th>
                <th className="table_head_data">Status </th>
                <th className="table_head_data">Start Date </th>
                <th className="table_head_data">End Date </th>
                <th className="table_head_data">Estimated Time </th>
                <th className="table_head_data">Completed Time </th>
                <th className="table_head_data">Actions </th>
              </tr>
            </thead>
            <tbody className="table_body">
              {isclinettaskinfodata?.map((item, index) => {
                console.log(item, "item project atsk");
                return (
                  <>
                    <tr className="body_row" key={index}>
                      <td className="table_data">{index + 1}</td>
                      <td className="table_data">{item.Task_Name}</td>
                      <td className="table_data">{item.Task_description}</td>
                      <td className="table_data">{item.Priority}</td>
                      <td className="table_data">{item.Status}</td>
                      <td className="table_data">{item.StartDate}</td>
                      <td className="table_data">{item.EndDate}</td>
                      <td className="table_data">{item.Estimated_Time}</td>
                      <td className="table_data">{item.Completed_time}</td>

                      <td className="table_data">
                        <Link to={`/client/client-taskinfo/${item.task_Id}`}>
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
      <Pagination />
    </div>
  );
};

export default ClientProjectTask;
