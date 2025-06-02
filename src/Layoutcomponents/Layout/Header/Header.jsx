import React from "react";

const Header = ({setIsOpen, isOpen}) => {
  return (
    <div className="layout_wrapper_header">
      <div className="header_box">
        <div className="header_left_item">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {" "}
            click
          </button>
        </div>

        <div className="header_right_item">
          <h1>profile</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
