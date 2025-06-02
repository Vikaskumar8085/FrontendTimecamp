import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  fetchcontractorprojectapicall,
  fetchcontractorprojectTimesheetapicall,
  fetchsinglecontractorapicall,
} from "../../../ApiServices/AdminApiServices/Contractor";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import TabComp from "../../../common/TabComponent/TabComp";
import ContractorInformation from "./ContractorInfopage/ContractorInformation";
import ContractorTimesheet from "./ContractorInfopage/ContractorTimesheet";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorInfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [isContractordata, setIscontractordata] = useState([]);
  const [iscontractorprojectdata, setIscontractorprojectdata] = useState([]);
  const [IsContractorProjectTimesheetdata, setIsCoractorProjectTimesheetdata] =
    useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  // approved timesheet by admin
  const approvecontractortimesheet = async (value) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: value,
      };
      const response = await approvetimesheetbyadminapicall(val);
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response.message);
        getcontractorProjectTimesheetfunc();
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };
  const disapprovecontractortimesheet = async (values) => {
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
        getcontractorProjectTimesheetfunc();
        setSelectedItems(null);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getcontractorProjectTimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const biiledcontractortimesheet = async (values) => {
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
        getcontractorProjectTimesheetfunc();
        setSelectedItems([]);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        getcontractorProjectTimesheetfunc();
        setSelectedItems([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setSelectedItems([]);
      toast.error(error?.response?.data?.message);
    }
  };
  // disapproved timesheet by admin

  const fetchcontractorprojectfunc = async () => {
    try {
      const response = await fetchcontractorprojectapicall(id);
      if (response.success) {
        setIscontractorprojectdata(response.result);
      }
    } catch (error) {}
  };
  const getcontractorInfo = async () => {
    try {
      const response = await fetchsinglecontractorapicall(id);
      console.log(response);
      if (response.success) {
        setIscontractordata(response.result);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getcontractorProjectTimesheetfunc = async () => {
    try {
      const response = await fetchcontractorprojectTimesheetapicall(id);
      if (response.success) {
        setIsCoractorProjectTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getcontractorProjectTimesheetfunc();
    getcontractorInfo();
    fetchcontractorprojectfunc();
  }, [0]);

  const tabsheader = [{title: "Contractor Info"}, {title: "TimeSheet"}];
  const Tabsbody = [
    {
      content: (
        <>
          <ContractorInformation
            isContractordata={isContractordata}
            iscontractorprojectdata={iscontractorprojectdata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ContractorTimesheet
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            approvecontractortimesheet={approvecontractortimesheet}
            biiledcontractortimesheet={biiledcontractortimesheet}
            disapprovecontractortimesheet={disapprovecontractortimesheet}
            data={IsContractorProjectTimesheetdata}
          />
        </>
      ),
    },
  ];
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Contractor Info" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default ContractorInfo;
