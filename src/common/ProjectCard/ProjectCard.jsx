import React from "react";

const ProjectCard = ({icon, label, paragraph}) => {
  return (
    <div className="Project_card_wrapper">
      <div className="Project_Card_box">
        <div className="Project_card_label">
          <h6>{label}</h6>
        </div>
        <div className="Project_card_content">
          <span>{icon}</span>
          <p>{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
