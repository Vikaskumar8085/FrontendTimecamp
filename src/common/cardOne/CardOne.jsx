import React from "react";
const CardOne = ({icon, title, paragraph}) => {
  return (
    <div className="cardOne_container">
      <div className="cardone_row">
        <div className="cardoneleft">
          <i>{icon}</i>
        </div>
        <div className="cardoneright">
          <div className="right-heading-text">
            <h1>{title}</h1>
            <div className="right-paragraph">{paragraph}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
