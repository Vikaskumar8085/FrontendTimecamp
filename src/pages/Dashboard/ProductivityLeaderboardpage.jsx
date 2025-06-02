import React, { useState } from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import TabComp from "../../common/TabComponent/TabComp";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ProductivityLeaderBoardTable from "../../Component/DashboardComponents/Admin/ProductivityLeaderBoardTable";
import Projectroi from "../../Component/DashboardComponents/Admin/ProjectRoi/Projectroi";
import TotalActualandTotalEstimatedHours from "../../Component/DashboardComponents/Admin/ProjectRoi/TotalActualandTotalEstimatedHours";
import ProjectROIChart from "../../Component/DashboardComponents/Admin/ProjectRoi/ProjectRoiChart";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import ProjectLeaderBoard from "../../Component/DashboardComponents/Admin/ProjecctLeaderBoard/ProjectLeaderBoard";

const ProductivityLeaderboardpage = () => {
  const [isSubState, setisSubState] = useState(0);

  const tabsheader = [
    { title: "Productivity Leader Board" },
    { title: "Project ROI" },
    { title: "Project Report" },
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ProductivityLeaderBoardTable />
        </>
      ),
    },
    {
      content: (
        <>
          <TotalActualandTotalEstimatedHours />
          <ProjectROIChart />
          <Projectroi />
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectLeaderBoard />
        </>
      ),
    },
  ];
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Productivity LeaderBoard" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default ProductivityLeaderboardpage;
