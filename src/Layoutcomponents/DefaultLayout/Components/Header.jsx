import React from "react";
import "./header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header_logo">My Dashboard</div>
        <div className="header_actions">
          <button className="header_button">Profile</button>
          <button className="header_button">Logout</button>
        </div>
      </header>
    </>
  );
};

export default Header;
