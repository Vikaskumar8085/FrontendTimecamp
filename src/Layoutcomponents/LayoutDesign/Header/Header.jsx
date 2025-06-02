import React, {useEffect} from "react";
import Notification from "../Notification/Notification";
import Profile from "../Profile/Profile";
import {FiSearch} from "react-icons/fi";
import logo from "../../../assets/auth/logo.png";
import {fetchuserNotificationapicall} from "../../../ApiServices/AdminApiServices/Admin";
import apiInstance from "../../../ApiInstance/apiInstance";
const Header = () => {
  const [show, setShow] = React.useState(false);
  const [IsOpen, setIsOpen] = React.useState(false);

  const [isnotification, setisnotification] = React.useState(false);

  return (
    <>
      <div className="wrapper_header">
        <div className="header_leftside">
          <img src={logo} alt="logo" />

          <div className="leftside_text">
            <h1>timecamp</h1>
            <p>Time Tracking Software</p>
          </div>

          <div className="search_input_wrapper">
            <FiSearch className="search_icon" />
            <input
              type="text"
              placeholder="Search for project, task, employees & clients"
            />
          </div>
        </div>

        <div className="header_rightside">
          {/* notification design */}
          <Notification
            isnotification={isnotification}
            setisnotification={setisnotification}
          />
          {/* notification design */}
          {/* profile compoent design */}
          <Profile show={show} setShow={setShow} />
          {/* profile compoent design */}
        </div>
      </div>
    </>
  );
};

export default Header;
