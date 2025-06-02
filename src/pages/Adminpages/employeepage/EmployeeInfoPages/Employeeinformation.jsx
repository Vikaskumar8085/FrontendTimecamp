import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid2,
} from "@mui/material";
import CardOne from "../../../../common/cardOne/CardOne";
import bgImage from "../../../../assets/commonIcon/profilepic.png";
import Empty from "../../../../common/EmptyFolder/Empty";
const Employeeinformation = ({isEmployeedata, isEmployeeprojectdata}) => {
  console.log(isEmployeeprojectdata, "datata");
  const content = (
    <>
      <div className="Employee_card_wrapper">
        <div className="Employee_card_wrapper_box">
          <div className="Employee_card_header">
            <img src={bgImage} alt="" srcset="" />
            <div className="Employee_header_tags">
              <img
                src={
                  isEmployeedata.Photos || "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="User avatar"
                loading="lazy"
              />
              <h1>{isEmployeedata.UserName}</h1>
              {/*<p>{IsEmployeeInfodata?.Employee_Address}</p> */}
            </div>
          </div>
          <div className="Employee_body">
            <Grid2 container spacing={2}>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"FirstName"}
                  paragraph={isEmployeedata?.FirstName}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"LastName"}
                  paragraph={isEmployeedata?.LastName}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Email"} paragraph={isEmployeedata?.Email} />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Phone"} paragraph={isEmployeedata?.Phone} />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Address"}
                  paragraph={isEmployeedata?.Address}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Joining Date"}
                  paragraph={isEmployeedata?.Joining_Date}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Designation Name"}
                  paragraph={
                    isEmployeedata?.Designation_Name ||
                    "Please Select Employee Designation"
                  }
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project Creation Permission"}
                  paragraph={isEmployeedata?.Permission ? "Yes" : "No"}
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
    </>
  );

  const employeeprojects = (
    <>
      <Box sx={{mt: 3}}>
        <h1>Employee Project</h1>
      </Box>
      {isEmployeeprojectdata.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isEmployeeprojectdata.map((project, index) => (
                <TableRow key={project.ProjectId}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{project.Project_Name}</TableCell>
                  <TableCell>{project.Project_Code}</TableCell>
                  <TableCell>{project.Project_Type}</TableCell>
                  <TableCell>
                    {project.Project_Status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>{project.Start_Date}</TableCell>
                  <TableCell>{project.End_Date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableRow>
          <TableCell colSpan={8} align="center">
            <Empty />
          </TableCell>
        </TableRow>
      )}
    </>
  );

  return (
    <div>
      {content}
      {employeeprojects}
    </div>
  );
};

export default Employeeinformation;
