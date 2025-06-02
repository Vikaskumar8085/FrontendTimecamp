import React from "react";
import Emptyfolder from "../../assets/commonIcon/empty-folder.png";

const Empty = () => {
  return (
    <div className="Empty_wrapper">
      <div className="Empty_box">
        <img src={Emptyfolder} alt="no-image" />
        <p>No data is available</p>
      </div>
    </div>
  );
};

export default Empty;
