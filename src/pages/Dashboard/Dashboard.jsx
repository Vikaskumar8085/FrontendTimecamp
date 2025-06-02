import React from "react";
import {useSelector} from "react-redux";
import Layout from "../../Layoutcomponents/Layout/Layout";
import DashCounter from "../../Component/DashboardComponents/Admin/DashCounter";
import ProductivityLeaderBoard from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoard";
import RecentProjects from "../../Component/DashboardComponents/Admin/RecentProjects";
import RecentTimesheet from "../../Component/DashboardComponents/Admin/RecentTimesheet";
import EmployeeTimeHours from "../../Component/DashboardComponents/Admin/EmployeeTimeHours";
import Managerdashboardheader from "../../Component/DashboardComponents/Manager/Managerdashboardheader";
import {Box, Card, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import ManagerProductivityLeaderboard from "../../Component/DashboardComponents/Manager/ManagerProductivityLeaderboard";
import ContractordashboardCounter from "../../Component/DashboardComponents/Contractor/ContractordashboardCounter";
import Clientdashboarheader from "../../Component/DashboardComponents/Client/Clientdashboarheader";
import RecentProject from "../../Component/DashboardComponents/Client/RecentProject";
import Employeedashboardcounter from "../../Component/DashboardComponents/Employee/Employeedashboardcounter";
import EmployeeTotalHourByResources from "../../Component/DashboardComponents/Employee/EmployeeTotalHourByResources";
import EmployeeRecentProject from "../../Component/DashboardComponents/Employee/EmployeeRecentProject";
import ContractorRecentProject from "../../Component/DashboardComponents/Contractor/ContractorRecentProject";
import ContractorHourbyResources from "../../Component/DashboardComponents/Contractor/ContractorHourbyResources";
import RecentTask from "../../Component/DashboardComponents/Admin/RecentTask";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Dashboard = () => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });

  let Role = userdata.Role;
  return (
    <LayoutDesign>
      {Role === "Admin" && (
        <>
          <DashCounter />
          <ProductivityLeaderBoard />
          <EmployeeTimeHours />
          <RecentProjects />
          <RecentTimesheet />
          <RecentTask />
        </>
      )}
      {Role === "Client" && (
        <div>
          <Clientdashboarheader />
          <RecentProject />
        </div>
      )}
      {Role === "Employee" && (
        <>
          {" "}
          <div>
            <Employeedashboardcounter />
          </div>
          <div>
            <EmployeeTotalHourByResources />
          </div>
          <div>
            <EmployeeRecentProject />
          </div>
        </>
      )}
      {Role === "Contractor" && (
        <div>
          <ContractordashboardCounter />
          <ContractorRecentProject />
          <ContractorHourbyResources />
        </div>
      )}
      {Role === "Manager" && (
        <div>
          <Managerdashboardheader />
          <Card sx={{padding: 3, marginTop: 5, borderRadius: 2}}>
            <Box sx={{px: 2}}>
              <Link to={"/manager/productivity-leaderboard"}>view all</Link>
            </Box>{" "}
            <ManagerProductivityLeaderboard />
          </Card>
        </div>
      )}
    </LayoutDesign>
  );
};

export default Dashboard;
