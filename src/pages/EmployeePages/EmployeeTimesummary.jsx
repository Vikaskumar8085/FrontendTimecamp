import React from "react";

import EmployeeTotalHoursByResources from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByResources";
import EmployeeTotalHoursByProject from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByProject";
import EmployeeTotalHoursByCompany from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeTotalHoursByCompany";
import EmployeeBillingStatusDistribution from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeBillingStatusDistribution";
import EmployeeProjectTimeUtilization from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeProjectTimeUtilization";
import EmployeeDailyhours from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeDailyhours";
import EmployeeApprovelbilingstatus from "../../Component/EmployeeComponents/EmployeeTimesummary/EmployeeApprovelbilingstatus";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import DateRangePicker from "../../common/DatePicker/DateRangePicker";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";

const EmployeeTimesummary = () => {
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Employee Time Summary" />
      <div
        style={{
          width: "100%",
          padding: "20px",
          background: "white",
          margin: "10px 0px",
        }}
      >
        <DateRangePicker />
      </div>

      <EmployeeTotalHoursByResources />
      <EmployeeTotalHoursByProject />
      <EmployeeTotalHoursByCompany />
      <EmployeeBillingStatusDistribution />
      <EmployeeDailyhours />
      <EmployeeApprovelbilingstatus />
      <EmployeeProjectTimeUtilization />
    </LayoutDesign>
  );
};

export default EmployeeTimesummary;
