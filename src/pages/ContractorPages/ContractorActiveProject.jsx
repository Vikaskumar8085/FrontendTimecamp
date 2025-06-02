import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {Link} from "react-router-dom";
import {fetchcontractoractiveprojectapicall} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
import {VisibilitySharp} from "@mui/icons-material";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorActiveProject = () => {
  const [isContractoractiveproject, setIsContractoractiveproject] = useState(
    []
  );

  const fetchcontractoractiveproject = async () => {
    try {
      const response = await fetchcontractoractiveprojectapicall();
      if (response.success) {
        setIsContractoractiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractoractiveproject();
  }, [0]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Contract Active Project" />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">Project Code</TableCell>
                <TableCell align="left">Project status</TableCell>
                <TableCell align="left">Project Type</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isContractoractiveproject?.map((item, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.Project_Name}</TableCell>
                      <TableCell>{item.Project_Code}</TableCell>
                      <TableCell>
                        {item.Project_Status === true ? "Active" : "InActive"}
                      </TableCell>
                      <TableCell>{item.Project_Type}</TableCell>
                      <TableCell>
                        {new Date(item.Start_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.End_Date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/contractor/contractor-project-info/${item.ProjectId}`}
                        >
                          <VisibilitySharp />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutDesign>
    </>
  );
};

export default ContractorActiveProject;
