import React from "react";
import Grid2 from "@mui/material/Grid2";
import CardOne from "../../../common/cardOne/CardOne";
import "./Teaminfo.scss";
import bgImage from "../../../assets/commonIcon/profilepic.png";
const TeamInfo = ({isteamInfo}) => {
  return (
    <>
      <div className="manager_card_wrapper">
        <div className="manager_card_wrapper_box">
          <div className="manager_card_header">
            <img src={bgImage} alt="" srcset="" />
            <div className="manager_header_tags">
              <img
                src={isteamInfo?.Photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User avatar"
                loading="lazy"
              />
              <h1>{isteamInfo?.UserName}</h1>
              {/* <p>{isteamInfo?.Address}</p> */}
            </div>
          </div>
          <div className="manager_team_body">
            <Grid2 container spacing={2}>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"FirstName"}
                  paragraph={isteamInfo?.FirstName}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"LastName"} paragraph={isteamInfo?.LastName} />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Email"} paragraph={isteamInfo?.Email} />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Phone"} paragraph={isteamInfo?.Phone} />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Address"} paragraph={isteamInfo?.Address} />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Joining Date"}
                  paragraph={isteamInfo?.Joining_Date}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Designation Name"}
                  paragraph={
                    isteamInfo?.Designation_Name ||
                    "Please Select Employee Designation"
                  }
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project Creation Permission"}
                  paragraph={isteamInfo?.Permission ? "Yes" : "No"}
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamInfo;
