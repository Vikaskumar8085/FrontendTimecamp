import React from "react";

const HeaderTab = ({children}) => {
  return (
    <>
      <div
        style={{
          marginBottom: "10px",
        }}
        className="headertab_container"
      >
        {children}
      </div>
    </>
  );
};

export default HeaderTab;
