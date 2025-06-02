import React, {useEffect} from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Badge} from "@mui/material";
import {fetchuserNotificationapicall} from "../../../ApiServices/AdminApiServices/Admin";
import apiInstance from "../../../ApiInstance/apiInstance";
const Notification = ({isnotification, setisnotification}) => {
  const [Isusernotificationdata, setusernotificationdata] = React.useState([]);
  const [Isclientnotificationdata, setclientnotificationdata] = React.useState(
    []
  );
  const [IsManagerNotification, setIsManagerNotificationdata] = React.useState(
    []
  );
  const [IsEmployeeNotificationdata, setIsEmployeeNotificationdata] =
    React.useState([]);
  const [IsContractorNotificationdata, setIsContractorNotificationdata] =
    React.useState([]);
  // fetch user/admin Notification
  const fetchuserNotificationfunc = async () => {
    try {
      const response = await fetchuserNotificationapicall();
      if (response?.success) {
        setusernotificationdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch user/admin Notification

  // fetch client notification

  const fetchclientnotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-notification"
      );
      if (response?.data.success) {
        setclientnotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch client notification

  const fetchemployeenotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-notification"
      );
      if (response?.data?.success) {
        setIsEmployeeNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const fetchcontractornotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-notification"
      );
      if (response?.data?.success) {
        setIsContractorNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const fetchmanagernotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-notification"
      );
      if (response?.data?.success) {
        setIsManagerNotificationdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchuserNotificationfunc();
    fetchclientnotificationfunc();
    fetchcontractornotificationfunc();
    fetchemployeenotificationfunc();
  }, [0]);

  // employee notification

  return (
    <>
      <div className="header_rightside_notification">
        <Badge
          sx={{
            background: "#ddd",
            borderRadius: "50%",
            padding: "5px",
          }}
          badgeContent={
            Isusernotificationdata.length ||
            Isclientnotificationdata.length ||
            IsEmployeeNotificationdata.length ||
            IsContractorNotificationdata.length
          }
          color="primary"
        >
          <NotificationsIcon
            style={{color: "#6560f0"}}
            onClick={() => setisnotification(!isnotification)}
            className="notification_icon"
          />
        </Badge>
        {isnotification && (
          <div className="notification-dropdown">
            <div className="dropdown-header">Notifications</div>
            <div className="dropdown-content">
              {Isclientnotificationdata.map((item, index) => (
                <div className="notification-item" key={index}>
                  <img src={item?.Pic} alt="avatar" className="avatar" />
                  <div className="info">
                    <div className="title">{item.Name}</div>
                    <div className="timestamp">{item.Description}</div>
                  </div>
                </div>
              ))}
              {/* meployee */}
              {IsEmployeeNotificationdata.map((item, index) => (
                <div className="notification-item" key={index}>
                  <img src={item?.Pic} alt="avatar" className="avatar" />
                  <div className="info">
                    <div className="title">{item.Name}</div>
                    <div className="timestamp">{item.Description}</div>
                  </div>
                </div>
              ))}{" "}
              {/*employee  */}
              {/* user */}
              {Isusernotificationdata.map((item, index) => (
                <div className="notification-item" key={index}>
                  <img src={item?.Pic} alt="avatar" className="avatar" />
                  <div className="info">
                    <div className="title">{item.Name}</div>
                    <div className="timestamp">{item.Description}</div>
                  </div>
                </div>
              ))}
              {/* user */}
              {/* contractor Notification */}
              {IsContractorNotificationdata.map((item, index) => (
                <div className="notification-item" key={index}>
                  <img src={item?.Pic} alt="avatar" className="avatar" />
                  <div className="info">
                    <div className="title">{item.Name}</div>
                    <div className="timestamp">{item.Description}</div>
                  </div>
                </div>
              ))}
              {/* contractor notification */}
              {/* manager notification data */}
              {IsManagerNotification.map((item, index) => (
                <div className="notification-item" key={index}>
                  <img src={item?.Pic} alt="avatar" className="avatar" />
                  <div className="info">
                    <div className="title">{item.Name}</div>
                    <div className="timestamp">{item.Description}</div>
                  </div>
                </div>
              ))}
              {/* manager notification data */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
