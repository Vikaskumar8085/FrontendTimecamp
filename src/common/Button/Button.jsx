import React from "react";

function Button({onclick, children, arialabel, type, ...rest}) {
  return (
    <>
      <div className="btn_wrapper">
        <button className="btn" type={type} onClick={onclick} {...rest}>
          {children}
        </button>
      </div>
    </>
  );
}

export default Button;
