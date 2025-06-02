import React from "react";
import Button from "../Button/Button";

const TModal = ({onClose, open, title, children}) => {
  return (
    <>
      <div
        className={`model-container ${open ? "model-open" : ""}`}
        onClick={onClose}
      >
        <div
          className="model-content"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
        >
          <div className="model-header">
            <h1>{title}</h1>
            <button className="model-close" onClick={onClose}>
              X
            </button>
          </div>
          <div className="model-body">{children}</div>
          {/* <div className="model-footer">
            <Button onClick={onClose}>Close</Button>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default React.memo(TModal);
