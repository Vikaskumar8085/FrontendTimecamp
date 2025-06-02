import React from "react";
import {Button, Grid2} from "@mui/material";
import bgImage from "../../../../assets/commonIcon/profilepic.png";
import moment from "moment";
import CardOne from "../../../../common/cardOne/CardOne";
import ProjectCard from "../../../../common/ProjectCard/ProjectCard";

const ProjectInformation = ({IsprojectInfodata}) => {
  return (
    <div className="project_card_wrapper">
      <div className="project_card_wrapper_box">
        <div className="project_card_header">
          <div className="project_header_tags">
            <div className="project_header_tags_title">
              <h1>Project Information</h1>
            </div>
            {/* <div className="project_header_tags_box">
                <Button>Delete</Button>
              </div> */}
          </div>
        </div>
        <div className="project_body">
          <Grid2 container>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"Project Name"}
                paragraph={IsprojectInfodata?.Project_Name}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"Project Code"}
                paragraph={IsprojectInfodata?.Project_Code}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"Start Date"}
                paragraph={IsprojectInfodata?.Start_Date}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"End Date"}
                paragraph={IsprojectInfodata?.End_Date}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"Project_Type"}
                paragraph={IsprojectInfodata?.Project_Type}
              />
            </Grid2>
            <Grid2 size={{md: 6, lg: 6, sm: 12}}>
              <ProjectCard
                label={"Project_Status"}
                paragraph={
                  IsprojectInfodata?.Project_Status ? "Active" : "InActive"
                }
              />
            </Grid2>
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
