import {
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Link,
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
import bgImage from "../../../../assets/commonIcon/profilepic.png";
import React from "react";
import CardOne from "../../../../common/cardOne/CardOne";

const ContractorInformation = ({isContractordata, iscontractorprojectdata}) => {
  //

  const contractorprojectdata = (
    <>
      {iscontractorprojectdata && iscontractorprojectdata.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iscontractorprojectdata.map((project, index) => (
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
        <Typography variant="body2">{null}</Typography>
      )}
    </>
  );

  return (
    <>
      <div className="Employee_card_wrapper">
        <div className="Employee_card_wrapper_box">
          <div className="Employee_card_header">
            <img src={bgImage} alt="" srcset="" />
            <div className="Employee_header_tags">
              <img
                src={
                  isContractordata.Photos?.[0] ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="User avatar"
                loading="lazy"
              />
              <h1>{isContractordata.UserName}</h1>
              {/*<p>{IsEmployeeInfodata?.Employee_Address}</p> */}
            </div>
          </div>
          <div className="Employee_body">
            <Grid2 container spacing={2}>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"FirstName"}
                  paragraph={isContractordata?.FirstName}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"LastName"}
                  paragraph={isContractordata?.LastName}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Email"} paragraph={isContractordata?.Email} />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne title={"Phone"} paragraph={isContractordata?.Phone} />
              </Grid2>

              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Address"}
                  paragraph={isContractordata?.Address}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Joining Date"}
                  paragraph={isContractordata?.Joining_Date}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Designation Name"}
                  paragraph={
                    isContractordata?.Designation_Name ||
                    "Please Select contractor Designation"
                  }
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project Creation Permission"}
                  paragraph={isContractordata?.Permission ? "Yes" : "No"}
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
      {/* <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      > */}
      {/* Profile Avatar */}
      {/* <Avatar
          src={isContractordata.Photos?.[0]}
          alt={isContractordata.FirstName}
          sx={{width: 80, height: 80}}
        /> */}
      {/* Employee Info */}
      {/* <CardContent sx={{flex: 1}}>
          <Typography variant="h6" fontWeight="bold">
            {isContractordata.FirstName} {isContractordata.LastName}
          </Typography>
          <Chip
            label={isContractordata.IsActive}
            color={isContractordata.IsActive === "Active" ? "success" : "error"}
            sx={{mt: 1}}
          />
          <Typography variant="body2" color="text.secondary">
            📞 {isContractordata.Phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✉️ {isContractordata.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🏠 {isContractordata.Address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🗓 Joining Date:{" "}
            {isContractordata.Joining_Date === "Invalid date"
              ? "Not Available"
              : isContractordata.Joining_Date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🎭 Role: {isContractordata.Role}
          </Typography> */}

      {/* Social Link */}
      {/* {isContractordata.Socail_Links && (
            <Typography variant="body2" color="primary" sx={{mt: 1}}>
              🔗{" "}
              <Link
                href={isContractordata.Socail_Links}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </Link>
            </Typography>
          )} */}
      {/* </CardContent> */}
      {/* </Card> */}
      <div>{contractorprojectdata}</div>
    </>
  );
};

export default ContractorInformation;
