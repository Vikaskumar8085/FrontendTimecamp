import React, {useState} from "react";
import {useParams} from "react-router-dom";
import TabComp from "../../common/TabComponent/TabComp";
import ContractorProjectinformation from "./ContractorSubPages/ContractorProjectinformation";
import ContractorProjectTimesheet from "./ContractorSubPages/ContractorProjectTimesheet";
import ContractorProjectTask from "./ContractorSubPages/ContractorProjectTask";
import Layout from "../../Layoutcomponents/Layout/Layout";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorProjectInfo = () => {
  const [isSubState, setisSubState] = useState(0);
  const {id} = useParams();
  const tabsheader = [
    {title: "Contractor Project Info"},
    {title: "Contractor TimeSheets"},
    {title: "Contractor Tasks"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <ContractorProjectinformation id={id} />
        </>
      ),
    },
    {
      content: (
        <>
          <ContractorProjectTimesheet id={id} />
        </>
      ),
    },
    {
      content: (
        <>
          <ContractorProjectTask id={id} />
        </>
      ),
    },
  ];
  return (
    <LayoutDesign>
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </LayoutDesign>
  );
};

export default ContractorProjectInfo;
