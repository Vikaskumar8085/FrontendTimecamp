import React from "react";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import Layout from "../../Layoutcomponents/Layout/Layout";
import ManagerProductivityLeaderboard from "../../Component/DashboardComponents/Manager/ManagerProductivityLeaderboard";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ManagerProductivityLeaderboardPage = () => {
  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Manager Productivity LeaderBoard" />
        <ManagerProductivityLeaderboard />
      </LayoutDesign>
    </>
  );
};

export default ManagerProductivityLeaderboardPage;
