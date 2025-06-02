import React from "react";
import {NavLink} from "react-router-dom";
import {FaUserTie, FaBuilding, FaUserShield} from "react-icons/fa";
import logo from "../../../assets/auth/Logo.png";
const Sidebar = ({setDropdownOpen, isOpen, dropdownOpen, Role}) => {
  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({...prev, [menu]: !prev[menu]}));
  };
  return (
    <div className={`layout_wrapper_sidebar ${isOpen ? "open" : "closed"}`}>
      <div
        className="logo-box"
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          padding: "30px 0px",
        }}
      >
        <img src={logo} alt="" srcset="" />
      </div>

      <nav className="sidebar_menu">
        {Role === "Admin" && (
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/company"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Company
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/Invoice"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Invoice
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/task"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/forecast-report"
                className={"nav_link"}
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Forecast
              </NavLink>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("client")}
              >
                Client <span>{dropdownOpen.client ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.client ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/client" className="nav_link">
                    <FaUserTie className="icon" /> All Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-client" className="nav_link">
                    <FaBuilding className="icon" /> Active Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-client" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Client
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Dead-client" className="nav_link">
                    <FaUserShield className="icon" /> Dead Client
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Employee")}
              >
                Employee <span>{dropdownOpen.Employee ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Employee ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/employee" className="nav_link">
                    <FaUserTie className="icon" /> All Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-employee" className="nav_link">
                    <FaBuilding className="icon" /> Active Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-employee" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Employee
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Contractor")}
              >
                Contractor <span>{dropdownOpen?.Contractor ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Contractor ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/contractor" className="nav_link">
                    <FaUserTie className="icon" /> All Contractor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-contractor" className="nav_link">
                    <FaBuilding className="icon" /> Active Contractor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-contractor" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Contractor
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("TimeSheet")}
              >
                TimeSheet <span>{dropdownOpen?.TimeSheet ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.TimeSheet ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/timesheet" className="nav_link">
                    <FaUserTie className="icon" /> Timesheet
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timesheet/project-time" className="nav_link">
                    <FaBuilding className="icon" /> Project Time
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/timesheet/time-summary" className="nav_link">
                    <FaUserShield className="icon" /> Time summary
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("masters")}
              >
                Masters <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.masters ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/master/designation" className="nav_link">
                    <FaUserTie className="icon" /> Designation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/department" className="nav_link">
                    <FaBuilding className="icon" /> Department
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/roles" className="nav_link">
                    <FaUserShield className="icon" /> Roles
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/weekoffdays" className={"nav_link"}>
                    <FaUserShield className="icon" /> Week Off Days
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/holiday" className={"nav_link"}>
                    <FaUserShield className="icon" /> holiday
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/standard" className={"nav_link"}>
                    <FaUserShield className="icon" /> Standard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/master/color" className={"nav_link"}>
                    <FaUserShield className="icon" /> color
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Project")}
              >
                Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Project ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/project" className="nav_link">
                    <FaUserTie className="icon" /> Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/active-projects" className="nav_link">
                    <FaBuilding className="icon" /> Active Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inactive-projects" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Projects
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        )}

        {Role === "Client" && (
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Profile
              </NavLink>
            </li>

            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Timesheet")}
              >
                TimeSheets <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Timesheet ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink
                    to={"/client/TimeSheet"}
                    style={({isActive}) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                    className="nav_link"
                  >
                    <FaUserTie className="icon" /> Time Sheet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/client/client-project-Time"
                    className="nav_link"
                    style={({isActive}) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    <FaBuilding className="icon" /> Project Time
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/client/client-time-summary"
                    className="nav_link"
                    style={({isActive}) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    <FaUserShield className="icon" /> Time Summary
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to={"/client/tasks"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Task
              </NavLink>
            </li>
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Project")}
              >
                Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Project ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/client/project" className="nav_link">
                    <FaUserTie className="icon" /> Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/client/active-project" className="nav_link">
                    <FaBuilding className="icon" /> Active Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/client/inactive-project" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Projects
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        )}
        {Role === "Employee" && (
          <>
            <ul>
              <li>
                <NavLink
                  to={"/dashboard"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/profile"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/employee/tasks"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Task
                </NavLink>
              </li>
              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Project")}
                >
                  Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Project ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink to="/employee/projects" className="nav_link">
                      <FaUserTie className="icon" /> Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employee/active-projects"
                      className="nav_link"
                    >
                      <FaBuilding className="icon" /> Active Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employee/inactive-inprojects"
                      className="nav_link"
                    >
                      <FaUserShield className="icon" /> Inactive Projects
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* timesheets */}
              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Timesheet")}
                >
                  TimeSheets <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Timesheet ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink
                      to="/employee/Timesheet"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                      className="nav_link"
                    >
                      <FaUserTie className="icon" /> Time Sheet
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employee/employee-project-Time"
                      className="nav_link"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                    >
                      <FaBuilding className="icon" /> Project Time
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employee/employee-time-summary"
                      className="nav_link"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                    >
                      <FaUserShield className="icon" /> Time Summary
                    </NavLink>
                  </li>
                </ul>
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
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/profile"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contractor/tasks"}
                  className="nav_link"
                  style={({isActive}) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Task
                </NavLink>
              </li>

              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Timesheet")}
                >
                  TimeSheets <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Timesheet ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink
                      to="/contractor/Timesheet"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                      className="nav_link"
                    >
                      <FaUserTie className="icon" /> Time Sheet
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contractor/contractor-project-time"
                      className="nav_link"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                    >
                      <FaBuilding className="icon" /> Project Time
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contractor/contractor-timesummary"
                      className="nav_link"
                      style={({isActive}) => ({
                        color: isActive ? "greenyellow" : "white",
                      })}
                    >
                      <FaUserShield className="icon" /> Time Summary
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <button
                  className="dropdown_btn"
                  onClick={() => toggleDropdown("Project")}
                >
                  Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
                </button>
                <ul
                  className={`dropdown_menu ${
                    dropdownOpen.Project ? "show" : "hide"
                  }`}
                >
                  <li>
                    <NavLink to="/contractor/projects" className="nav_link">
                      <FaUserTie className="icon" /> Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contractor/active-projects"
                      className="nav_link"
                    >
                      <FaBuilding className="icon" /> Active Project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contractor/inactive-projects"
                      className="nav_link"
                    >
                      <FaUserShield className="icon" /> Inactive Projects
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}
        {Role === "Manager" && (
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/manager/team"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Team
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/manager/task"}
                className="nav_link"
                style={({isActive}) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Task
              </NavLink>
            </li>
            {/* project */}
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Project")}
              >
                Project <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Project ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/manager/project" className="nav_link">
                    <FaUserTie className="icon" /> Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manager/active-project" className="nav_link">
                    <FaBuilding className="icon" /> Active Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manager/inactive-project" className="nav_link">
                    <FaUserShield className="icon" /> Inactive Projects
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* project */}
            <li className="dropdown">
              <button
                className="dropdown_btn"
                onClick={() => toggleDropdown("Timesheet")}
              >
                TimeSheet <span>{dropdownOpen.masters ? "▲" : "▼"}</span>
              </button>
              <ul
                className={`dropdown_menu ${
                  dropdownOpen.Timesheet ? "show" : "hide"
                }`}
              >
                <li>
                  <NavLink to="/manager/timesheet" className="nav_link">
                    <FaUserTie className="icon" /> Timesheet
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manager/timesummary" className="nav_link">
                    <FaBuilding className="icon" /> TimeSummary
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manager/projectTime" className="nav_link">
                    <FaUserShield className="icon" /> Project Time
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        )}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
