import React from "react";
import "./TaskCard.scss";

const TaskCard = ({progress, status, date, taskName, user}) => {
  const statusClass = `task-card__status task-card__status--${status
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  return (
    <div className="task-card">
      <div className="task-card__header">
        <span className="task-card__progress">{progress}%</span>
        <span className={statusClass}>{status}</span>
      </div>
      <div className="task-card__date">{date}</div>
      <div className="task-card__task-name">{taskName}</div>
      <div className="task-card__user">
        <img src={user.avatar} alt={user.name} className="task-card__avatar" />
        <div className="task-card__user-info">
          <div className="task-card__user-name">{user.name}</div>
          <div className="task-card__user-role">{user.role}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
