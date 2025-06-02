import React from "react";

const Teamproject = ({isProjectInfo}) => {
  console.log(isProjectInfo);
  const content = isProjectInfo?.map((item, index) => {
    console.log(item.Project_Name, "item");
    return (
      <ul>
        <li key={index}>{index + 1}</li>
        <li>{item.Project_Name}</li>
        <li>{item.Project_Code}</li>
        <li>{item.Start_Date}</li>
        <li>{item.End_Date}</li>
      </ul>
    );
  });
  return <div>{content}</div>;
};

export default Teamproject;
