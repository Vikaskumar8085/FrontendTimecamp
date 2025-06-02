import {Routes, Route, useLocation} from "react-router-dom";
import Nopage from "./pages/ErrorPage/Nopage";
import Contractor from "./pages/Adminpages/contractorpage/Contractor";
import Admin from "./pages/Adminpages/Adminpage/Admin";
import Employee from "./pages/Adminpages/employeepage/Employee";
import Client from "./pages/Adminpages/clientPage/Client";
import Project from "./pages/Adminpages/Projectpage/Project";
import Task from "./pages/Adminpages/TaskPage/Task";
import Timesheet from "./pages/Adminpages/Timesheetpage/Timesheet";
import Designation from "./pages/Adminpages/masterPages/Designation";
import Department from "./pages/Adminpages/masterPages/Department";
import Roles from "./pages/Adminpages/masterPages/Roles";
import Login from "./pages/AuthPages/Login";
import {useEffect, useState} from "react";
import Loader from "./common/Loader/Loader";
import Signup from "./pages/AuthPages/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Company from "./pages/Adminpages/Company/Company";
import Taskupload from "./pages/Adminpages/TaskPage/Taskupload";
import ProjectUpload from "./pages/Adminpages/Projectpage/ProjectUpload";
import Activeclient from "./pages/Adminpages/clientPage/Activeclient";
import Deadclient from "./pages/Adminpages/clientPage/Deadclient";
import Deactiveclient from "./pages/Adminpages/clientPage/Deactiveclient";
import ContractorInfo from "./pages/Adminpages/contractorpage/ContractorInfo";
import Employeeinfo from "./pages/Adminpages/employeepage/Employeeinfo";
import ActiveEmployee from "./pages/Adminpages/employeepage/ActiveEmployee";
import DeactiveEmployee from "./pages/Adminpages/employeepage/DeactiveEmployee";
import Activecontractor from "./pages/Adminpages/contractorpage/Activecontractor";
import InActivecontractor from "./pages/Adminpages/contractorpage/InActivecontractor";
import Activeproject from "./pages/Adminpages/Projectpage/Activeproject";
import Inactiveprojects from "./pages/Adminpages/Projectpage/Inactiveprojects";
import Profile from "./pages/Dashboard/Profile";
import Clientinfo from "./pages/Adminpages/clientPage/Clientinfo";
import Projectinfo from "./pages/Adminpages/Projectpage/Projectinfo";
import {useSelector} from "react-redux";
import SpinnerLoader from "./common/SpinnerLoader/SpinnerLoader";
import Layout from "./Layoutcomponents/Layout/Layout";
import {Toaster} from "react-hot-toast";
import ProjectTime from "./pages/Adminpages/Timesheetpage/ProjectTime";
import TimesheetSummary from "./pages/Adminpages/Timesheetpage/TimesheetSummary";
import Forget from "./pages/AuthPages/ForgetPassword/Forget";
import ResetPassword from "./pages/AuthPages/Resetpassword/ResetPassword";
import VerifyPage from "./pages/AuthPages/VerifyPage/VerifyPage";
import ClientActiveProject from "./pages/ClientPages/ClientActiveProject";
import ClientInactiveProject from "./pages/ClientPages/ClientInactiveProject";
import ClientProjects from "./pages/ClientPages/ClientProjects";
import ClientTaskPages from "./pages/ClientPages/ClientTaskPages";
import EmployeeProjects from "./pages/EmployeePages/EmployeeProjects";
import EmployeeActiveProject from "./pages/EmployeePages/EmployeeActiveProject";
import EmployeeInactiveProjects from "./pages/EmployeePages/EmployeeInactiveProjects";
import EmployeeTasks from "./pages/EmployeePages/EmployeeTasks";
import EmployeeTimesheets from "./pages/EmployeePages/EmployeeTimesheets";
import ContractorTasks from "./pages/ContractorPages/ContractorTasks";
import ContractorProject from "./pages/ContractorPages/ContractorProject";
import ContractorActiveProject from "./pages/ContractorPages/ContractorActiveProject";
import ContractorInactiveProject from "./pages/ContractorPages/ContractorInactiveProject";
import ContractorTimesheet from "./pages/ContractorPages/ContractorTimesheet";
import ClientTimesheet from "./pages/ClientPages/ClientTimesheet";
import ClientPageinfo from "./pages/ClientPages/ClientPageinfo";
import ContractorProjectInfo from "./pages/ContractorPages/ContractorProjectInfo";
import EmployeeProjectinfo from "./pages/EmployeePages/EmployeeProjectinfo";
import ManagerTeam from "./pages/ManagerPages/ManagerTeam";
import ManagerProject from "./pages/ManagerPages/ManagerProject";
import ManagerProjectActive from "./pages/ManagerPages/ManagerProjectActive";
import ManagerInactiveProject from "./pages/ManagerPages/ManagerInactiveProject";
import ManagerTimesheet from "./pages/ManagerPages/ManagerTimesheet";
import ManagerTimeSummary from "./pages/ManagerPages/ManagerTimeSummary";
import ManagerProjectInfo from "./pages/ManagerPages/ManagerProjectInfo";
import ManagerProjectTime from "./pages/ManagerPages/ManagerProjectTime";
import Taskpage from "./pages/ManagerPages/Taskpage";
import ProductivityLeaderboardpage from "./pages/Dashboard/ProductivityLeaderboardpage";
import ManagerProductivityLeaderboard from "./pages/ManagerPages/ManagerProductivityLeaderboardPage";
import ManagerProductivityLeaderboardPage from "./pages/ManagerPages/ManagerProductivityLeaderboardPage";
import ContractorTimeSummary from "./pages/ContractorPages/ContractorTimeSummary";
import ContractorProjectTimesheet from "./pages/ContractorPages/ContractorSubPages/ContractorProjectTimesheet";
import ContractorProjectTime from "./pages/ContractorPages/ContractorProjectTime";
import EmployeeProjectTime from "./pages/EmployeePages/EmployeeProjectTime";
import EmployeeTimesummary from "./pages/EmployeePages/EmployeeTimesummary";
import ClientProjectTime from "./pages/ClientPages/ClientProjectTime";
import ClientTimeSummary from "./pages/ClientPages/ClientTimeSummary";
import Taskview from "./pages/Adminpages/TaskPage/Taskview";
import NotificationPage from "./pages/Dashboard/NotificationPage";
import ContractorTaskInfo from "./pages/ContractorPages/ContractorTaskInfo";
import EmployeeTaskinfo from "./pages/EmployeePages/EmployeeTaskinfo";
import Holiday from "./pages/Adminpages/masterPages/Holiday";
import ColorPage from "./pages/Adminpages/masterPages/ColorPage";
import WeekoffDays from "./pages/Adminpages/masterPages/WeekoffDays";
import Invoice from "./pages/Adminpages/Invoice/invoice";
import Standard from "./pages/Adminpages/masterPages/Standard";
import ForcastingPage from "./pages/Adminpages/ForeCasting/ForcastingPage";
import Home from "./pages/Home";
import ChangePassword from "./pages/Dashboard/ChangePassword";
import ManagerTeamInfo from "./pages/ManagerPages/ManagerTeamPages/ManagerTeamInfo";
import ClientTaskInfo from "./pages/ClientPages/ClientTaskinfo/ClientTaskInfo";

const App = () => {
  const [loading, setLoading] = useState(true);
  const loadspinner = useSelector((state) => state.loader.IsLoading);
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {loadspinner && <SpinnerLoader />}
      <Routes>
        {/* auth pages */}
        <Route path="/index" element={<Home />} />
        <Route index element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/verify/:id" element={<VerifyPage />} />

        {/* auth pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/productivity-leaderboard"
          element={<ProductivityLeaderboardpage />}
        />
        <Route path="/profile" element={<Profile />} />
        {/* Admin Pages */}
        <Route path="/company" element={<Company />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        <Route path="/client-info/:id" element={<Clientinfo />} />
        <Route path="/active-client" element={<Activeclient />} />
        <Route path="/inactive-client" element={<Deactiveclient />} />
        <Route path="/dead-client" element={<Deadclient />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/active-employee" element={<ActiveEmployee />} />
        <Route path="/inactive-employee" element={<DeactiveEmployee />} />
        <Route path="/employee-info/:id" element={<Employeeinfo />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/active-contractor" element={<Activecontractor />} />
        <Route path="/inactive-contractor" element={<InActivecontractor />} />
        <Route path="/contractor-info/:id" element={<ContractorInfo />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project-info/:id" element={<Projectinfo />} />
        <Route path="/active-projects" element={<Activeproject />} />
        <Route path="/inactive-projects" element={<Inactiveprojects />} />
        <Route path="/project-upload" element={<ProjectUpload />} />
        <Route path="/task" element={<Task />} />
        <Route path="task-upload" element={<Taskupload />} />
        <Route path="/task-view/:id" element={<Taskview />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/timesheet/project-time" element={<ProjectTime />} />
        <Route path="/timesheet/time-summary" element={<TimesheetSummary />} />
        <Route path="/master/designation" element={<Designation />} />
        <Route path="/master/department" element={<Department />} />
        <Route path="/master/roles" element={<Roles />} />
        <Route path="/master/holiday" element={<Holiday />} />
        <Route path="/master/weekoffdays" element={<WeekoffDays />} />
        <Route path="/master/color" element={<ColorPage />} />
        <Route path="/master/standard" element={<Standard />} />
        <Route path="/Invoice" element={<Invoice />} />
        <Route path="/forecast-report" element={<ForcastingPage />} />
        {/* Admin pages */}
        {/* client pages */}
        <Route
          path="/client/active-project"
          element={<ClientActiveProject />}
        />

        <Route path="/client/tasks" element={<ClientTaskPages />} />
        <Route path="/client/project" element={<ClientProjects />} />
        <Route
          path="/client/inactive-project"
          element={<ClientInactiveProject />}
        />
        <Route path="/client/Timesheet" element={<ClientTimesheet />} />
        <Route
          path="/client/client-pageinfo/:id"
          element={<ClientPageinfo />}
        />
        <Route
          path="/client/client-project-Time"
          element={<ClientProjectTime />}
        />
        <Route
          path="/client/client-time-summary"
          element={<ClientTimeSummary />}
        />
        <Route path="client/client-taskinfo/:id" element={<ClientTaskInfo />} />
        {/* client pages */}

        {/* employee Pages */}

        <Route path="/employee/projects" element={<EmployeeProjects />} />
        <Route
          path="/employee/active-projects"
          element={<EmployeeActiveProject />}
        />
        <Route
          path="/employee/inactive-inprojects"
          element={<EmployeeInactiveProjects />}
        />
        <Route path="/employee/tasks" element={<EmployeeTasks />} />
        <Route path="/employee/Timesheet" element={<EmployeeTimesheets />} />
        <Route
          path="/employee/employee-project-info/:id"
          element={<EmployeeProjectinfo />}
        />

        <Route
          path="/employee/employee-project-Time"
          element={<EmployeeProjectTime />}
        />
        <Route
          path="/employee/employee-time-summary"
          element={<EmployeeTimesummary />}
        />
        <Route path="/employee/task-view/:id" element={<h1>task view</h1>} />

        <Route path="/employee/taskinfo/:id" element={<EmployeeTaskinfo />} />

        {/* employee Pages */}

        {/* contractor  */}
        <Route path="/contractor/tasks" element={<ContractorTasks />} />
        <Route path="/contractor/projects" element={<ContractorProject />} />
        <Route
          path="/contractor/active-projects"
          element={<ContractorActiveProject />}
        />
        <Route
          path="/contractor/inactive-projects"
          element={<ContractorInactiveProject />}
        />
        <Route path="/contractor/Timesheet" element={<ContractorTimesheet />} />
        <Route
          path="/contractor/contractor-project-info/:id"
          element={<ContractorProjectInfo />}
        />
        <Route
          path="/contractor/contractor-timesummary"
          element={<ContractorTimeSummary />}
        />
        <Route
          path="/contractor/contractor-project-time"
          element={<ContractorProjectTime />}
        />
        <Route
          path="/contractor/taskinfo/:id"
          element={<ContractorTaskInfo />}
        />
        {/* contractor  */}

        {/* Manager */}
        <Route path="/manager/team" element={<ManagerTeam />} />
        <Route path="/manager/project" element={<ManagerProject />} />
        <Route
          path="/manager/active-project"
          element={<ManagerProjectActive />}
        />
        <Route
          path="/manager/inactive-project"
          element={<ManagerInactiveProject />}
        />
        <Route path="/manager/timesheet" element={<ManagerTimesheet />} />
        <Route path="/manager/timesummary" element={<ManagerTimeSummary />} />
        <Route
          path="/manager/project-info/:id"
          element={<ManagerProjectInfo />}
        />
        <Route path="/manager/projectTime" element={<ManagerProjectTime />} />
        <Route
          path="/manager/productivity-leaderboard"
          element={<ManagerProductivityLeaderboardPage />}
        />

        <Route path="/manager/Team-info/:id" element={<ManagerTeamInfo />} />

        <Route path="/manager/task" element={<Taskpage />} />
        <Route path="/manager/view-task/:id" element={<h1>view task</h1>} />
        {/* Manager */}

        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
