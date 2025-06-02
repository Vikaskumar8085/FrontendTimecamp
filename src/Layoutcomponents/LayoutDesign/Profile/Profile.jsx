import React from "react";
import "./ProfileCard.scss";
import { Link } from "react-router-dom";
import { LogOut, User, Users, Key } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = ({ setShow, show }) => {
  const userdata = useSelector((state) => {
    return state.user.values;
  });
  return (
    <>
      {/* <div className="profile-card" onClick={() => setShow(!show)}>
        <div className="top-section">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="avatar"
          />
          <div className="info">
            <h4 className="name">Ralph Edwards</h4>
            <p className="email">ralphedwards@gmail.com</p>
          </div>
          <button className="logout-btn">
            <LogOut
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              size={18}
            />
          </button>
        </div>
        {show && (
          <ul className="menu">
            <li>
              <User size={18} />
              <span>Profile</span>
            </li>
            <li>
              <Users size={18} />
              <span>Members</span>
            </li>
            <li>
              <Key size={18} />
              <span>Change Password</span>
            </li>
          </ul>
        )}
      </div> */}

      <div className="profile-wrapper">
        <div className="profile-info">
          {userdata?.Role === "Client" && (
            <img
              src={userdata?.Client_Photo || "https://i.pravatar.cc/48?img=12"}
              alt="Admin Avatar"
              className="avatar"
            />
          )}
          {userdata?.Role === "Admin" && (
            <img
              src={userdata?.Photo || "https://i.pravatar.cc/48?img=1"}
              alt="Admin Avatar"
              className="avatar"
            />
          )}
          {userdata?.Role === "Employee" && (
            <img
              src={userdata?.Photos?.[0] || "https://i.pravatar.cc/48?img=1"}
              alt="Admin Avatar"
              className="avatar"
            />
          )}

          {userdata?.Role === "Manager" && (
            <img
              src={userdata?.Photos?.[0] || "https://i.pravatar.cc/48?img=1"}
              alt="Admin Avatar"
              className="avatar"
            />
          )}
          {userdata?.Role === "Contractor" && (
            <img
              src={userdata?.Photos?.[0] || "https://i.pravatar.cc/48?img=1"}
              alt="Admin Avatar"
              className="avatar"
            />
          )}
          <div className="details">
            <span className="name">
              {userdata?.Role === "Client" && userdata?.Client_Name}
              {userdata?.Role === "Admin" && userdata?.FirstName}
              {userdata?.Role === "Employee" && userdata?.FirstName}
              {userdata?.Role === "Contractor" && userdata?.FirstName}
              {userdata?.Role === "Manager" && userdata?.FirstName}
            </span>
            <span className="role">
              {" "}
              {userdata?.Role === "Client" && userdata?.Role}
              {userdata?.Role === "Admin" && userdata?.Role}
              {userdata?.Role === "Employee" && userdata?.Role}
              {userdata?.Role === "Manager" && userdata?.Role}
              {userdata?.Role === "Contractor" && userdata?.Role}
            </span>
          </div>
          <button className="logout-btn">
            <LogOut
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              size={18}
            />
          </button>
          <svg
            className={`chevron ${show ? "open" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.192l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>{" "}
        {show && (
          <div className="dropdown-menu">
            <ul className="menu">
              <li>
                <User size={18} />
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Users size={18} />
                <span>Members</span>
              </li>
              <li>
                <Key size={18} />
                <Link to="/change-password"> Change Password</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
