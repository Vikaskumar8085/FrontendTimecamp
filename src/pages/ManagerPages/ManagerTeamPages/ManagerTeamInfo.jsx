import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import toast from "react-hot-toast";
import {
  fetchmanagerteaminfoapicall,
  fetchmanagerteamprojectsapicall,
} from "../../../ApiServices/ManagerApiServices";
import TeamInfo from "../../../Component/ManagerComponents/ManageTeamComponent/TeamInfo";
import Teamproject from "../../../Component/ManagerComponents/ManageTeamComponent/Teamproject";
import Empty from "../../../common/EmptyFolder/Empty";

const ManagerTeamInfo = () => {
  const [isteamInfo, setTeamInfo] = useState(null);
  const [isProjectInfo, setProjectInfo] = useState(null);

  const { id } = useParams();

  const fetchmanagerteaminfoFunc = useCallback(async () => {
    try {
      const response = await fetchmanagerteaminfoapicall(id);
      if (response?.success) {
        setTeamInfo(response.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const fetchmamangerteamprojectfunc = useCallback(async () => {
    try {
      const response = await fetchmanagerteamprojectsapicall(id);
      console.log(response, "rproject team");
      if (response?.success) {
        setProjectInfo(response?.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const fetchmanagerteamprojecttimesheetfunc = useCallback(async () => {
    try {
      const response = await fetchmanagerteamprojectTimesheetapicall(id);
      if (response?.success) {
        console.log(response?.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchmanagerteaminfoFunc();
    fetchmamangerteamprojectfunc();
    fetchmanagerteamprojecttimesheetfunc();
  }, [
    fetchmanagerteaminfoFunc,
    fetchmamangerteamprojectfunc,
    fetchmanagerteamprojecttimesheetfunc,
  ]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Team Information" />
        <TeamInfo isteamInfo={isteamInfo} />

        <Teamproject isProjectInfo={isProjectInfo} />
      </LayoutDesign>
    </>
  );
};

export default ManagerTeamInfo;
