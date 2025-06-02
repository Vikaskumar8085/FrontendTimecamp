import React, {useCallback, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import toast from "react-hot-toast";
import apiInstance from "../../../ApiInstance/apiInstance";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {useDispatch} from "react-redux";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

import {Grid2} from "@mui/material";
import ProjectCard from "../../../common/ProjectCard/ProjectCard";
const ClientTaskInfo = () => {
  const {id} = useParams();
  const [isdata, setIsData] = useState();
  const dispatch = useDispatch();

  const fetchClientTaskInfo = useCallback(async (taskId) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.get(
        `/v2/client/client-task-info/${id}`
      );
      if (response.data.success) {
        dispatch(setLoader(false));
        toast.success(response?.data?.message);
        setIsData(response.data.result);
      } else {
        toast.error(response?.data?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while fetching task info."
      );
    }
  }, []);

  useEffect(() => {
    fetchClientTaskInfo();
  }, [fetchClientTaskInfo]);
  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Client Task Info" />

        <div className="task_container">
          <div className="task_box">
            <div className="task_box_title">
              <h1>Task Informaiton</h1>
            </div>

            <Grid2 container spacing={2}>
              <Grid2 size={{sm: 12, md: 6, lg: 6}} className="task_info">
                <ProjectCard
                  label={"Task name"}
                  paragraph={isdata?.Task_Name}
                />
              </Grid2>
              <Grid2 size={{sm: 12, md: 6, lg: 6}} className="task_info">
                <ProjectCard
                  label={"Task Description"}
                  paragraph={isdata?.Task_description}
                />
              </Grid2>
              <Grid2 size={{sm: 12, md: 6, lg: 6}} className="task_info">
                <ProjectCard
                  label={"Start Date"}
                  paragraph={isdata?.StartDate}
                />
              </Grid2>
              <Grid2 size={{sm: 12, md: 6, lg: 6}} className="task_info">
                <ProjectCard label={"End Date"} paragraph={isdata?.EndDate} />
              </Grid2>
              <Grid2 size={{sm: 12, md: 6, lg: 6}}>
                <ProjectCard label={"Task Status"} paragraph={isdata?.Status} />
              </Grid2>
              <Grid2 size={{sm: 12, md: 6, lg: 6}}>
                <ProjectCard
                  label={"Estimated Time"}
                  paragraph={isdata?.Estimated_Time}
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </LayoutDesign>
    </>
  );
};

export default ClientTaskInfo;
