import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../Layoutcomponents/Layout/Layout";
import TabComp from "../../common/TabComponent/TabComp";
import ClientProjectInfo from "./ClientInfoPage/ClientProjectInfo";
import ClientProjectTimesheet from "./ClientInfoPage/ClientProjectTimesheet";
import ClientProjectTask from "./ClientInfoPage/ClientProjectTask";
import {
  approveclienttimesheetapicall,
  disapprovetimesheetapicall,
  fetchclientprojectinfoapicall,
  fetchclienttaskinfoapicall,
  fetchclienttimesheetinfoapicall,
} from "../../ApiServices/Cllientapiservices/Client";
import {toast} from "react-hot-toast";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import apiInstance from "../../ApiInstance/apiInstance";

const ClientPageinfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);
  const [isClientprojectInfodata, setIsClientProjectInfodata] = useState([]);
  const [isclinettaskinfodata, setIsclienttaskinfodata] = useState([]);
  const [istaskMembers, setIstaskMembers] = useState([]);
  const [isRecentactivity, setIsRecentActivity] = useState([]);
  const [isClientTimesheetdata, setIsClientTimesheetdata] = useState([]);

  const [ismilestonelist, setmilestonelist] = useState([]);

  const dispatch = useDispatch();
  const fetchclientsingleprojectfunc = async () => {
    try {
      const response = await fetchclientprojectinfoapicall(id);
      if (response.success) {
        setIsClientProjectInfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    }
  };

  const fetchclienttaskinformationfunc = async () => {
    try {
      const response = await fetchclienttaskinfoapicall(id);
      if (response.success) {
        setIsclienttaskinfodata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    }
  };

  const fetchclienttimesheetinformationfunc = async () => {
    try {
      const response = await fetchclienttimesheetinfoapicall(id);
      if (response.success) {
        setIsClientTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const ApproveFunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: value,
      };
      const response = await approveclienttimesheetapicall(val);
      dispatch(setLoader(false));

      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response.message);
        fetchclienttimesheetinformationfunc();
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const disApproveFunc = async (value) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: id,
        payload: value,
      };
      const response = await disapprovetimesheetapicall(val);
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response.message);
        fetchclienttimesheetinformationfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response.messageF);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  // fetch allotted task Memebers

  const fetchclientprojectallotedTaskMemebsers = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/client/allotted-task-memebers/${id}`
      );
      if (response?.data?.success) {
        setIstaskMembers(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  //fetch client task Recenter activity

  const fetchclientTaskRecentActivityfunc = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/client/fetch-recent-task-activity/${id}`
      );
      if (response?.data?.success) {
        setIsRecentActivity(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  const fetchclienttaskmilestonefunc = useCallback(async () => {
    try {
      const response = await apiInstance.get(
        `/v2/client/fetch-task-milestones/${id}`
      );
      if (response?.data?.success) {
        setmilestonelist(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.response);
    }
  });

  const tabsheader = [
    {title: "Client Project Info"},
    {title: "Client Project TimeSheet"},
    {title: "Client Project Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ClientProjectInfo
            isClientprojectInfodata={isClientprojectInfodata}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <ClientProjectTimesheet
            ApproveFunc={ApproveFunc}
            disApproveFunc={disApproveFunc}
            isClientTimesheetdata={isClientTimesheetdata}
          />
        </>
      ),
    },

    {
      content: (
        <>
          <ClientProjectTask
            isclinettaskinfodata={isclinettaskinfodata}
            istaskMembers={istaskMembers}
            isRecentactivity={isRecentactivity}
            ismilestonelist={ismilestonelist}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchclientsingleprojectfunc();
    fetchclienttaskinformationfunc();
    fetchclienttimesheetinformationfunc();
    fetchclientprojectallotedTaskMemebsers();
    fetchclientTaskRecentActivityfunc();
    fetchclienttaskmilestonefunc();
  }, [0]);
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

export default ClientPageinfo;
