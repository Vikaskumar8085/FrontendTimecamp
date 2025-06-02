import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import {useSelector} from "react-redux";
import apiInstance from "../../ApiInstance/apiInstance";
import {List, ListItem, ListItemText, Paper} from "@mui/material";
import Empty from "../../common/EmptyFolder/Empty";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";

const NotificationPage = () => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });
  const [Isadmindata, setIsAdmindata] = useState([]);
  const [Isclientdata, setIsClientdata] = useState([]);
  const [Isemployeedata, setIsemployeedata] = useState([]);
  const [Iscontractordata, setIscontractordata] = useState([]);
  const [Ismanagerdata, setismanagerdata] = useState([]);
  const fetchadminusernotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v1/user/fetch-admin-notification"
      );
      if (response?.data?.success) {
        setIsAdmindata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  // client notification
  const fetchclientnotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-notification"
      );
      if (response?.data?.success) {
        setIsClientdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // employee notification

  const fetchemployeenotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-notification"
      );
      if (response?.data?.success) {
        setIsemployeedata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // contractor

  const fetchcontractornotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-notification"
      );
      if (response?.data?.success) {
        setIscontractordata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // fetch manager notification

  const fetchmanagernotificationfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/fetch-manager-notification"
      );
      if (response?.data?.success) {
        setismanagerdata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchadminusernotificationfunc();
    fetchclientnotificationfunc();
    fetchemployeenotificationfunc();
    fetchmanagernotificationfunc();
    fetchcontractornotificationfunc();
  }, [0]);

  return (
    <Layout>
      {userdata?.Role === "Admin" && (
        <>
          <BreadCrumb pageName="Notification" />
          {Isadmindata?.length > 0 ? (
            Isadmindata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
      {userdata?.Role === "Manager" && (
        <>
          <BreadCrumb pageName="Mananger Notification" />
          {Ismanagerdata?.length > 0 ? (
            Ismanagerdata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
      {userdata?.Role === "Employee" && (
        <>
          {" "}
          <BreadCrumb pageName="Employee Notification" />
          {Isemployeedata?.length > 0 ? (
            Isemployeedata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
      {userdata?.Role === "Contractor" && (
        <>
          <BreadCrumb pageName="Contractor Notification" />

          {Iscontractordata?.length > 0 ? (
            Iscontractordata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
      {userdata?.Role === "Client" && (
        <>
          <BreadCrumb pageName="Client Notification" />

          {Isclientdata?.length > 0 ? (
            Isclientdata.map((item, index) => {
              return (
                <Paper sx={{my: 1}}>
                  <List>
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={item?.Name}
                        secondary={item?.Description}
                      />
                    </ListItem>
                  </List>
                </Paper>
              );
            })
          ) : (
            <Empty />
          )}
        </>
      )}
    </Layout>
  );
};

export default NotificationPage;
