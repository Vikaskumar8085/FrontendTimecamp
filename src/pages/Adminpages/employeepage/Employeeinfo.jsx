import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {
  fetchemployeeprojectapicall,
  fetchemployeeprojecttimesheetapicall,
  fetchsingleemployeeapicall,
} from "../../../ApiServices/AdminApiServices/Employee";
import {Paper} from "@mui/material";
import Card from "../../../common/Card/Card";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import Employeeinformation from "./EmployeeInfoPages/Employeeinformation";
import Timesheet from "./EmployeeInfoPages/Timesheet";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Employeeinfo = () => {
  const {id} = useParams();
  const [isEmployeedata, setIsEmployeedata] = useState([]);
  const [isSubState, setisSubState] = useState(0);
  const [isEmployeeprojectdata, setIsemployeeprojectdata] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const [isEmployeeProjectTimesheetdata, setIsEmployeeProjectTimesheetdata] =
    useState([]);

  const fetchsingleemployeefunc = async () => {
    try {
      const response = await fetchsingleemployeeapicall(id);
      console.log(response, "data employee data");
      if (response.success) {
        setIsEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchemployeeprojectsfunc = async () => {
    try {
      const response = await fetchemployeeprojectapicall(id);
      if (response.success) {
        setIsemployeeprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchemployeeTimesheetfunc = async () => {
    try {
      const response = await fetchemployeeprojecttimesheetapicall(id);
      if (response.success) {
        setIsEmployeeProjectTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const approveEmployeetimesheet = async (values) => {
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
        fetchemployeeTimesheetfunc();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        setSelectedItems([]);
        toast.error(response?.message);
        fetchemployeeTimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  const disapproveEmployeetimesheet = async (values) => {
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
        fetchemployeeTimesheetfunc();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchemployeeTimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  const biiledEmployeetimesheet = async (values) => {
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
        fetchemployeeTimesheetfunc();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchemployeeTimesheetfunc();
        setSelectedItems([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setSelectedItems([]);

      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchsingleemployeefunc();
    fetchemployeeprojectsfunc();
    fetchemployeeTimesheetfunc();
  }, [0]);

  const tabsheader = [{title: "Empoyee Info"}, {title: "TimeSheet"}];
  const Tabsbody = [
    {
      content: (
        <>
          <Employeeinformation
            isEmployeedata={isEmployeedata}
            isEmployeeprojectdata={isEmployeeprojectdata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <Timesheet
            approveEmployeetimesheet={approveEmployeetimesheet}
            disapproveEmployeetimesheet={disapproveEmployeetimesheet}
            biiledEmployeetimesheet={biiledEmployeetimesheet}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            data={isEmployeeProjectTimesheetdata}
          />
        </>
      ),
    },
  ];

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee info" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default Employeeinfo;
