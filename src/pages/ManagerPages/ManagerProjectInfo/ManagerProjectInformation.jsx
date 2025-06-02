import React from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Typography, Card, CardContent, CardHeader, Grid} from "@mui/material";

const ManagerProjectInformation = ({IsManagerprojectinfo}) => {
  return (
    <>
      <BreadCrumb pageName="Project information" />
      <Card elevation={3}>
        <CardHeader title="Project Timesheet Details" />
        <CardContent>
          {IsManagerprojectinfo ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <b>Project Code:</b>{" "}
                {IsManagerprojectinfo[0]?.Project_Code || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Project Name:</b>{" "}
                {IsManagerprojectinfo[0]?.Project_Name || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Client Name:</b>{" "}
                {IsManagerprojectinfo[0]?.ClientName?.join(", ") || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Project Manager:</b>{" "}
                {IsManagerprojectinfo[0]?.ProjectManagerName?.join(", ") ||
                  "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Start Date:</b>{" "}
                {IsManagerprojectinfo[0]?.Start_Date || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>End Date:</b> {IsManagerprojectinfo[0]?.End_Date || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Project Type:</b>{" "}
                {IsManagerprojectinfo[0]?.Project_Type || "N/A"}
              </Grid>
              <Grid item xs={6}>
                <b>Project Status:</b>{" "}
                {IsManagerprojectinfo[0]?.Project_Status
                  ? "Active"
                  : "Inactive"}
              </Grid>
              <Grid item xs={6}>
                <b>Project Hours:</b>{" "}
                {IsManagerprojectinfo[0]?.Project_Hours || "N/A"}
              </Grid>
            </Grid>
          ) : (
            <Typography align="center">
              No project timesheet data found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ManagerProjectInformation;
