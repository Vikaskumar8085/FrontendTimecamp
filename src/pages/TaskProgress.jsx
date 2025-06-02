import React from "react";
import TaskCard from "./TaskCard";

const TaskProgress = () => {
  const tasks = [
    {
      progress: 50,
      status: "On Progress",
      date: "30 Dec 2024",
      taskName: "Design Post for Twitter",
      user: {
        name: "Theresa Webb",
        role: "Graphic Designer",
        avatar: "/images/theresa.jpg",
      },
    },
    {
      progress: 100,
      status: "Done",
      date: "30 Dec 2024",
      taskName: "Analyze Facebook Ad Campaign",
      user: {
        name: "Cameron Williamson",
        role: "Content Analyst",
        avatar: "/images/cameron.jpg",
      },
    },
  ];

  return (
    <div
      className="task-progress"
      style={{
        height: "400px",
        width: "100%",
        display: "block",
        overflow: "auto",
      }}
    >
      <h2 className="task-progress__title">Task Progress</h2>
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  );
};

export default TaskProgress;
