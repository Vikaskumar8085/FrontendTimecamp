import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../../ApiInstance/apiInstance";
import moment from "moment";
import Grid from "@mui/material/Grid2";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import ProjectCard from "../../../common/ProjectCard/ProjectCard";

const Taskview = () => {
  const {id} = useParams();
  const [IsTaskview, setIsTaskView] = useState([]);
  console.log(IsTaskview, "daaaaaaaaaaaaa");
  const fetchtaskviewinformationfunc = async () => {
    try {
      const response = await apiInstance.get(`/v1/admin/view-task/${id}`);
      if (response.data.success) {
        setIsTaskView(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchtaskviewinformationfunc();
  }, [0]);

  const getAttachmentViewer = (url) => {
    if (!url) return <p>N/A</p>;

    const extension = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
      return (
        <img
          src={url}
          alt="attachment"
          style={{width: "100%", height: "200px"}}
        />
      );
    } else if (extension === "pdf") {
      return (
        <iframe src={url} width="100%" height="500px" title="PDF Preview" />
      );
    } else if (
      ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(extension)
    ) {
      const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
      )}`;

      return (
        <iframe
          src={officeViewerUrl}
          style={{width: "100%", height: "100px"}}
          title="Office Document Preview"
        />
      );
    } else {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Download Attachment
        </a>
      );
    }
  };

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Task Information" />

      <div
        className="task_information_card"
        style={{
          padding: "15px",
          position: "relative",
          background: "white",
          margin: "10px 0px",
        }}
      >
        <div className="task_card_title" style={{margin: "10px 0px"}}>
          <h1
            style={{
              fontSize: "1.2em",
              textTransform: "capitalize",
              color: "gray",
            }}
          >
            Task Information
          </h1>
        </div>
        <Grid container spacing={2}>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Task Name"}
              paragraph={IsTaskview?.data?.Task_Name}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Project Name"}
              paragraph={IsTaskview?.ProjectName}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Milestone Name"}
              paragraph={IsTaskview?.MilestoneName}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Priority"}
              paragraph={IsTaskview?.data?.Priority}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Start Date"}
              paragraph={moment(IsTaskview?.data?.StartDate).format(
                "DD/MM/YYYY"
              )}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"End Date"}
              paragraph={moment(IsTaskview?.data?.EndDate).format("DD/MM/YYYY")}
            />
          </Grid>{" "}
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Estimated Time"}
              paragraph={IsTaskview?.data?.Estimated_Time || "N/A"}
            />
          </Grid>
          <Grid size={{md: 6, sm: 12, lg: 6}}>
            <ProjectCard
              label={"Status"}
              paragraph={IsTaskview?.data?.Status || "N/A"}
            />
          </Grid>
          <Grid size={{md: 12, sm: 12, lg: 12}}>
            <div className="task_description" style={{margin: "10px 0px"}}>
              <h1 style={{margin: "10px"}}>Task Description</h1>
              <h6
                style={{
                  letterSpacing: "1px",
                  background: "#ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  color: "#grey",
                  fontWeight: "100",
                }}
              >
                {IsTaskview?.data?.Task_description || "N/A"}
              </h6>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="task_attachment" style={{margin: "10px 0px"}}>
              <h1 style={{margin: "10px"}}>Attachment </h1>
              {getAttachmentViewer(IsTaskview?.data?.Attachment)}
            </div>
          </Grid>
        </Grid>
      </div>
    </LayoutDesign>
  );
};

export default Taskview;
