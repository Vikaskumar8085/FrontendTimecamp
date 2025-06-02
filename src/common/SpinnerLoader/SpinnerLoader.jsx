import React from "react";
import {ScaleLoader} from "react-spinners";
const SpinnerLoader = () => {
  return (
    <>
      <div className="Loader_container">
        <div className="Loader_row">
          <div className="loader_content">
            <ScaleLoader color="yellowgreen" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpinnerLoader;
