import React from "react";

const Card = ({children}) => {
  return (
    <>
      <div className="Card_container">
        <div className="Card_Row">{children}</div>
      </div>
    </>
  );
};

export default Card;
