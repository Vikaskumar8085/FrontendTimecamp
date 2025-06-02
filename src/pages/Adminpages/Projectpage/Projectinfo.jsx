import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import ProjectInformation from "./ProjectInfoPages/ProjectInformation";
import ProjectTimesheet from "./ProjectInfoPages/ProjectTimesheet";
import ProjectTask from "./ProjectInfoPages/ProjectTask";
import {
  fetchprojecttimesheetapicall,
  fetchsingleprojectapicall,
} from "../../../ApiServices/ProjectApiServices";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import apiInstance from "../../../ApiInstance/apiInstance";
import Chart from "react-apexcharts";
import {Card, CardContent, Typography, CircularProgress} from "@mui/material";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Projectinfo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [isSubState, setisSubState] = useState(0);
  const [IsprojectInfodata, setIsprojectInfodata] = useState([]);
  const [Isprojecttimesheetdata, setIsprojecttimesheetdata] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(Isprojecttimesheetdata, "?>>>>>>>>>>>>...");

  const fetchprojecttimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchprojecttimesheetapicall(id);
      if (response?.success) {
        dispatch(setLoader(false));
        setIsprojecttimesheetdata(response.result);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const getsingleprojectfunc = async () => {
    try {
      const response = await fetchsingleprojectapicall(id);
      if (response.success) {
        setIsprojectInfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  // approved and disapproved and billed
  const approveprojectfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await approvetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchprojecttimesheetfunc();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const disapproveprojectfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: values,
      };
      const response = await disapprovetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchprojecttimesheetfunc();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchprojecttimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const billedprojectfunc = async (values) => {
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
        fetchprojecttimesheetfunc();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchprojecttimesheetfunc();
        setSelectedItems([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setSelectedItems([]);

      toast.error(error?.response?.data?.message);
    }
  };

  // approved and disapproved and billed
  // fetch project info chart

  const fetchprojectinfochartfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v1/admin/fetch-project-staff-chart/${id}`
      );
      if (response.data.success) {
        const data = response?.data.result;
        const categories = data.map((item) => item.FirstName);
        const hours = data.map((item) => item.hours);
        const billedHours = data.map((item) => item.billedHours);
        setChartData({
          options: {
            chart: {
              type: "bar",
              toolbar: {show: false},
            },
            xaxis: {
              categories,
            },
            colors: ["#2196f3", "#00695c"],
            title: {
              text: "Project Hours Overview",
              align: "center",
              style: {fontSize: "18px"},
            },
          },
          series: [
            {name: "Hours Worked", data: hours},
            {name: "Billed Hours", data: billedHours},
          ],
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getsingleprojectfunc();
    fetchprojecttimesheetfunc();
    fetchprojectinfochartfunc();
  }, [0]);

  const tabsheader = [
    {title: "Project Info"},
    {title: "TimeSheet"},
    {title: "Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ProjectInformation IsprojectInfodata={IsprojectInfodata} />
          {/* <Card>
            <CardContent>
              {loading ? (
                <CircularProgress
                  style={{display: "block", margin: "20px auto"}}
                />
              ) : (
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  height={350}
                />
              )}
            </CardContent>
          </Card> */}
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectTimesheet
            approveprojectfunc={approveprojectfunc}
            disapproveprojectfunc={disapproveprojectfunc}
            billedprojectfunc={billedprojectfunc}
            Isprojecttimesheetdata={Isprojecttimesheetdata}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectTask id={id} />
        </>
      ),
    },
  ];

  return (
    <LayoutDesign>
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default Projectinfo;
