import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {
  fetchclientprojectsapicall,
  fetchclientTimesheetapicall,
  fetchsignleclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import {Button, Grid2} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TimesheetList from "./ClientTImesheet/TimesheetList";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import bgimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import TabComp from "../../../common/TabComponent/TabComp";
import Empty from "../../../common/EmptyFolder/Empty";
import StatCard from "../../../common/StatCard/StatCard";
import apiInstance from "../../../ApiInstance/apiInstance";

const Clientinfo = () => {
  const {id} = useParams();
  const [IsClientdata, setIsclientdata] = useState([]);
  const [IsClientprojectsdata, setIsclientprojectsdata] = useState([]);
  const [isClientTimesheet, setIsClientTimesheets] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSubState, setisSubState] = useState(0);

  const dispatch = useDispatch();
  const getClientInfo = async () => {
    try {
      const response = await fetchsignleclientapicall(id);
      console.log(response);
      if (response.success) {
        setIsclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getclientsprojects = async () => {
    console.log("hello");
    try {
      const response = await fetchclientprojectsapicall(id);
      console.log(response, "asdlfkasdlkf");
      if (response.success) {
        setIsclientprojectsdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getclientTimesheet = async () => {
    try {
      const response = await fetchclientTimesheetapicall(id);
      if (response.success) {
        setIsClientTimesheets(response);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const approveclientTimesheetfunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: value,
      };
      const response = await approvetimesheetbyadminapicall(val);
      console.log(response, "response");
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response.message);
        getclientTimesheet();
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  const disapprovedclienttimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await disapprovetimesheetbyadminapicall(val);
      console.log(response, "response");
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        getclientTimesheet();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getclientTimesheet();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const biiledclienttimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await billedtimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        getclientTimesheet();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getclientTimesheet();
        setSelectedItems([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setSelectedItems([]);
      toast.error(error?.response?.data?.message);
    }
  };
  const [cards, setCards] = useState([]);
  const fetchclientTimesheetstatcardfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/client-stat-card/${id}`
      );
      setCards(response?.data?.data);
      console.log(response, "rersponse");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getClientInfo();
    getclientTimesheet();
    getclientsprojects();
    fetchclientTimesheetstatcardfunc();
  }, [0]);

  const tabsheader = [
    {title: "ClientInfo"},
    {title: "Client Project"},
    {title: "TimeSheet"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <div className="client_card_wrapper">
            <div className="client_card_wrapper_box">
              <div className="client_card_header">
                <img src={bgimage} alt="" srcset="" />
                <div className="client_header_tags">
                  <img
                    src={
                      IsClientdata?.Client_Photo ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="User avatar"
                    loading="lazy"
                  />
                  <h1>{IsClientdata.Client_Name}</h1>
                  <p>{IsClientdata?.Client_Address}</p>
                </div>
              </div>
              <div className="client_body">
                <Grid2 container spacing={2}>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Username"}
                      paragraph={IsClientdata?.Username}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Email"}
                      paragraph={IsClientdata?.Client_Email}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Phone"}
                      paragraph={IsClientdata?.Client_Phone}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Postal Code"}
                      paragraph={IsClientdata?.Client_Postal_Code}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Gst Number"}
                      paragraph={IsClientdata?.GstNumber}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"Client Status "}
                      paragraph={IsClientdata?.Client_Status}
                    />
                  </Grid2>
                  <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                    <CardOne
                      title={"system Access"}
                      paragraph={IsClientdata?.System_Access ? "yes" : "no"}
                    />
                  </Grid2>
                </Grid2>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      content: (
        <>
          {" "}
          {IsClientprojectsdata.length > 0 ? (
            <table className="table_Container">
              <thead className="table_head">
                <tr className="head_row">
                  <th className="table_head_data">Id</th>
                  <th className="table_head_data">Project Name</th>
                  <th className="table_head_data">Project Code </th>
                  <th className="table_head_data">Project Hours </th>
                  <th className="table_head_data">Start Date</th>
                  <th className="table_head_data">End Date </th>
                  <th className="table_head_data">Project Type</th>
                  <th className="table_head_data">Action </th>
                </tr>
              </thead>
              <tbody className="table_body">
                {IsClientprojectsdata?.map((item, index) => {
                  return (
                    <>
                      <tr className="body_row" key={index}>
                        <td className="table_data">{index + 1}</td>
                        <td className="table_data">{item.Project_Name}</td>
                        <td className="table_data">{item.Project_Code}</td>
                        <td className="table_data">{item.Project_Hours}</td>
                        <td className="table_data">{item.Start_Date}</td>
                        <td className="table_data">{item.End_Date}</td>
                        <td className="table_data">{item.Project_Type}</td>

                        <td className="table_data">
                          <Link to={`/project-info/${item.ProjectId}`}>
                            <VisibilityIcon />
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty />
          )}
        </>
      ),
    },
    {
      content: (
        <>
          <Grid2 container spacing={3} sx={{my: 1}}>
            {cards.map((card, index) => (
              <Grid2 key={index} size={{xs: 12, md: 3, lg: 3}}>
                <StatCard
                  index={index}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  percentage={card.percentage}
                  trendDown={card.trendDown}
                  chartData={card.chartData}
                />
              </Grid2>
            ))}
          </Grid2>
          <TimesheetList
            approveclientTimesheetfunc={approveclientTimesheetfunc}
            disapprovedclienttimesheetfunc={disapprovedclienttimesheetfunc}
            biiledclienttimesheetfunc={biiledclienttimesheetfunc}
            data={isClientTimesheet}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        </>
      ),
    },
  ];
  return (
    <LayoutDesign>
      {/* <BreadCrumb pageName="Client Information" /> */}

      <TabComp
        isSubState={isSubState}
        setisSubState={setisSubState}
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
      />
    </LayoutDesign>
  );
};

export default Clientinfo;
