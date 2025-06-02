import React from "react";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/auth/logo.png";
import {CiHome} from "react-icons/ci";
import {RxDashboard} from "react-icons/rx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessIcon from "@mui/icons-material/Business";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
const Sidebar = ({toggleDropdown, openDropdown, Role}) => {
  return (
    <>
      {" "}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="sidebar_wrapper">
          {Role === "Admin" && (
            <ul>
              <li>
                <NavLink
                  to={"/dashboard"}
                  style={({isActive}) => ({
                    color: isActive ? "black" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <DashboardCustomizeOutlinedIcon />
                  </span>
                  Dashboard
                </NavLink>
              </li>
              {/* profile design */}
              <li>
                <NavLink
                  to={"/profile"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <PermIdentityOutlinedIcon />
                  </span>
                  Profile
                </NavLink>
              </li>
              {/* profile design */}
              <li>
                <NavLink
                  to={"/invoice"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <ReceiptOutlinedIcon />
                  </span>
                  Invoice
                </NavLink>
              </li>

              {/* company */}

              <li>
                <NavLink
                  to={"/forecast-report"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <ReceiptOutlinedIcon />
                  </span>
                  ForeCast Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/company"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <BusinessIcon />
                  </span>
                  Company
                </NavLink>
              </li>
              {/* company */}
              {/* admin */}
              <li>
                <NavLink
                  to={"/admin"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span>
                    <ManageAccountsOutlinedIcon />
                  </span>
                  Admin
                </NavLink>
              </li>
              {/* admin */}

              {/* task */}
              <li>
                <NavLink
                  to={"/task"}
                  style={({isActive}) => ({
                    color: isActive ? "#6560f0" : "black",
                    background: isActive ? "#ff0df80d" : "",
                  })}
                  className={({isActive}) =>
                    `nav_link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav_link_icons">
                    <AssignmentOutlinedIcon />
                  </span>
                  <p>Task</p>{" "}
                </NavLink>
              </li>

              {/* task */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background: openDropdown === "client" ? "#ff0df80d" : "",
                    color: openDropdown === "client" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("client")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <PeopleOutlinedIcon />
                    </i>
                    Client
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "client" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>
                {/* client */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "client" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/client"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>All Clients</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/active-client"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Active Client</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inactive-client"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>InActive Client</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dead-client"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Dead Client</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* contractor */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background: openDropdown === "employee" ? "#ff0df80d" : "",
                    color: openDropdown === "employee" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("employee")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <Groups3OutlinedIcon />
                    </i>
                    Employee
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "employee" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>

                {/* employee */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "employee" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/employee"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>All Employee</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/active-employee"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Active Employee</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inactive-employee"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>InActive Employee</span>
                    </NavLink>
                  </li>
                </ul>
                {/* employee */}
              </li>
              {/* Employee */}
              {/* contractor */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background:
                      openDropdown === "contractor" ? "#ff0df80d" : "",
                    color: openDropdown === "contractor" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("contractor")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <Groups3OutlinedIcon />
                    </i>
                    Contractor
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "contractor" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>

                {/* employee */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "contractor" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/contractor"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>All Contractor</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/active-contractor"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Active Contractor</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inactive-contractor"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>InActive Contractor</span>
                    </NavLink>
                  </li>
                </ul>
                {/* employee */}
              </li>
              {/* Contractor */}
              {/* Projects */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background: openDropdown === "projects" ? "#ff0df80d" : "",
                    color: openDropdown === "projects" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("projects")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <WorkOutlineOutlinedIcon />
                    </i>
                    Project
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "projects" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>

                {/* employee */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "projects" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/project"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>All Projects</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/active-projects"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Active Projects</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inactive-projects"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>InActive Projects</span>
                    </NavLink>
                  </li>
                </ul>
                {/* Projects */}
              </li>
              {/* projects */}
              {/* timesheet */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background: openDropdown === "Timesheet" ? "#ff0df80d" : "",
                    color: openDropdown === "Timesheet" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("Timesheet")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <PeopleOutlinedIcon />
                    </i>
                    Timesheet
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "Timesheet" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>
                {/* client */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "Timesheet" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/timesheet"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Timesheet</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/timesheet/project-time"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Project Time</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/timesheet/time-summary"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Time Summary</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* timesheet */}

              {/* masters */}
              <li>
                <button
                  className="dropdown_btn"
                  style={{
                    background: openDropdown === "masters" ? "#ff0df80d" : "",
                    color: openDropdown === "masters" ? "#6560f0" : "black",
                  }}
                  onClick={() => toggleDropdown("masters")}
                >
                  <div className="dropdown-link">
                    <i className="dropdown-side-icons">
                      <SettingsIcon />
                    </i>
                    masters
                  </div>{" "}
                  <span>
                    {" "}
                    {openDropdown === "masters" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </button>

                {/* employee */}
                <ul
                  className={`dropdown_menu ${
                    openDropdown === "masters" ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      to="/master/designation"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Designation</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/department"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Department</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/roles"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>Roles</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/standard"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>standard </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/color"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>color</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/holiday"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>holiday</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/master/weekoffdays"
                      style={({isActive}) => ({
                        color: isActive ? "black" : "black",
                      })}
                      className="dropdown_link"
                    >
                      <span>weekoffdays</span>
                    </NavLink>
                  </li>
                </ul>
                {/* Projects */}
              </li>
              {/* masters */}
            </ul>
          )}

          {Role === "Client" && (
            <>
              <ul>
                <li>
                  <NavLink
                    to={"/dashboard"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <PermIdentityOutlinedIcon />
                    </span>
                    Dashboard
                  </NavLink>
                </li>

                {/* dashboard */}
                {/* profile */}
                <li>
                  <NavLink
                    to={"/profile"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Profile
                  </NavLink>
                </li>

                {/* profile */}
                {/* tasks */}
                <li>
                  <NavLink
                    to={"/client/tasks"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Task
                  </NavLink>
                </li>
                {/* tasks */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "client_timesheet" ? "#ff0df80d" : "",
                      color:
                        openDropdown === "client_timesheet"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("client_timesheet")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      TimeSheets
                    </div>{" "}
                    <span>
                      {" "}
                      {openDropdown === "client_timesheet" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* employee */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "client_timesheet" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/client/TimeSheet"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>All Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/client/client-project-Time"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Project Time</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/client/client-time-summary"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Timesummary</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>

                {/* client projects */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "client_projects" ? "#ff0df80d" : "",
                      color:
                        openDropdown === "client_projects"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("client_projects")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Project
                    </div>{" "}
                    <span>
                      {" "}
                      {openDropdown === "client_projects" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* employee */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "client_projects" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/client/project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>All Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/client/active-project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Active Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/client/inactive-project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>InActive Projects</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
                {/* client Projects */}
              </ul>
            </>
          )}

          {Role === "Employee" && (
            <>
              <ul>
                <li>
                  <NavLink
                    to={"/dashboard"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/employee/tasks"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Task
                  </NavLink>
                </li>
                {/* project  */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "employee_projects" ? "#ff0df80d" : "",
                      color:
                        openDropdown === "employee_projects"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("employee_projects")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Projects
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "employee_projects" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* employee */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "employee_projects" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/employee/projects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>All Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/employee/active-projects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Active Project</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/employee/inactive-inprojects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Inactive Projects</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
                {/* timesheets  */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "employee_timesheets"
                          ? "#ff0df80d"
                          : "",
                      color:
                        openDropdown === "employee_timesheets"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("employee_timesheets")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Timesheets
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "employee_timesheets" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* employee */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "employee_timesheets" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/employee/Timesheet"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>TimeSheet</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/employee/employee-project-Time"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Project Time</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/employee/employee-time-summary"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Timesummary</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
              </ul>
            </>
          )}
          {Role === "Contractor" && (
            <>
              <ul>
                <li>
                  <NavLink
                    to={"/dashboard"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/profile"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/contractor/tasks"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Tasks
                  </NavLink>
                </li>

                {/* project  */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "contractor_projects"
                          ? "#ff0df80d"
                          : "",
                      color:
                        openDropdown === "contractor_projects"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("contractor_projects")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Projects
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "contractor_projects" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* contractor */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "contractor_projects" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/contractor/projects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>All Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contractor/active-projects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Active Project</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contractor/inactive-projects"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Inactive Projects</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
                {/* timesheets  */}
                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "contractor_timesheets"
                          ? "#ff0df80d"
                          : "",
                      color:
                        openDropdown === "contractor_timesheets"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("contractor_timesheets")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Timesheets
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "contractor_timesheets" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* contractor */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "contractor_timesheets" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/contractor/Timesheet"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>TimeSheet</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contractor/contractor-project-time"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Project Time</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contractor/contractor-timesummary"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Timesummary</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
              </ul>
            </>
          )}

          {Role === "Manager" && (
            <>
              <ul>
                <li>
                  <NavLink
                    to={"/dashboard"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/manager/team"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/manager/task"}
                    style={({isActive}) => ({
                      color: isActive ? "black" : "black",
                      background: isActive ? "#ff0df80d" : "",
                    })}
                    className={({isActive}) =>
                      `nav_link ${isActive ? "active" : ""}`
                    }
                  >
                    <span>
                      <DashboardCustomizeOutlinedIcon />
                    </span>
                    Task
                  </NavLink>
                </li>

                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "manager_projects" ? "#ff0df80d" : "",
                      color:
                        openDropdown === "manager_projects"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("manager_projects")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Projects
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "manager_projects" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* manager */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "manager_projects" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/manager/project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>All Projects</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manager/active-project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Active Project</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manager/inactive-project"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Inactive Projects</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>

                {/* timesheet */}

                <li>
                  <button
                    className="dropdown_btn"
                    style={{
                      background:
                        openDropdown === "manager_timesheet" ? "#ff0df80d" : "",
                      color:
                        openDropdown === "manager_timesheet"
                          ? "#6560f0"
                          : "black",
                    }}
                    onClick={() => toggleDropdown("manager_timesheet")}
                  >
                    <div className="dropdown-link">
                      <i className="dropdown-side-icons">
                        <WorkOutlineOutlinedIcon />
                      </i>
                      Timesheets
                    </div>
                    <span>
                      {" "}
                      {openDropdown === "manager_timesheet" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                  </button>

                  {/* manager */}
                  <ul
                    className={`dropdown_menu ${
                      openDropdown === "manager_timesheet" ? "show" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        to="/manager/timesheet"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Timesheet</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manager/timesummary"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Time Summary</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manager/projectTime"
                        style={({isActive}) => ({
                          color: isActive ? "black" : "black",
                        })}
                        className="dropdown_link"
                      >
                        <span>Project Time</span>
                      </NavLink>
                    </li>
                  </ul>
                  {/* Projects */}
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
