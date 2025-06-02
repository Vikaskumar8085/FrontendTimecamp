import React, {useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TabComp from "../../../common/TabComponent/TabComp";
import ForeCastReport from "../../../Component/AdminComponents/Forecasting/ForeCastReport";
import ProjectForecast from "../../../Component/AdminComponents/Forecasting/ProjectForecast";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ForcastingPage = () => {
  const [isSubState, setisSubState] = useState(0);

  const tabsheader = [{title: "Team Forecast"}, {title: "Project Forecast"}];
  const Tabsbody = [
    {
      content: (
        <>
          <ForeCastReport />
        </>
      ),
    },
    {
      content: (
        <>
          <ProjectForecast />
        </>
      ),
    },
  ];
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Forcast Report" />
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default ForcastingPage;
