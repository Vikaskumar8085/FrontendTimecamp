import React, {useState} from "react";
import {useParams} from "react-router-dom";
import TabComp from "../../common/TabComponent/TabComp";
import EmployeeProjectInformation from "./EmployeeProjectInfo/EmployeeProjectInformation";
import EmployeeProjectTimesheet from "./EmployeeProjectInfo/EmployeeProjectTimesheet";
import EmployeeProjectTask from "./EmployeeProjectInfo/EmployeeProjectTask";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const EmployeeProjectinfo = () => {
  const {id} = useParams();
  const [isSubState, setisSubState] = useState(0);

  const tabsheader = [
    {title: "Employee Project Info"},
    {title: "Employee TimeSheet"},
    {title: "Employee Task"},
  ];
  const Tabsbody = [
    {
      content: (
        <>
          <EmployeeProjectInformation id={id} />
        </>
      ),
    },
    {
      content: (
        <>
          <EmployeeProjectTimesheet id={id} />
        </>
      ),
    },
    {
      content: (
        <>
          <EmployeeProjectTask id={id} />
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

export default EmployeeProjectinfo;
