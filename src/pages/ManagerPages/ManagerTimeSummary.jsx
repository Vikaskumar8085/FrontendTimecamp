import {Grid2, Typography} from "@mui/material";
import React from "react";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ManagerTotalHoursbyResources from "../../Component/ManagerComponents/TimesummaryComponent/ManagerTotalHoursbyResources";
import ManagerHourByProject from "../../Component/ManagerComponents/TimesummaryComponent/ManagerHourByProject";
import ManagerHourByCompany from "../../Component/ManagerComponents/TimesummaryComponent/ManagerHourByCompany";
import ManagerBillingDistribution from "../../Component/ManagerComponents/TimesummaryComponent/ManagerBillingDistribution";
import ManagerProjectTimeUtilization from "../../Component/ManagerComponents/TimesummaryComponent/ManagerProjectTimeUtilization";
import ManagerApprovelBillingStatus from "../../Component/ManagerComponents/TimesummaryComponent/ManagerApprovelBillingStatus";
import ManagerDailyHours from "../../Component/ManagerComponents/TimesummaryComponent/ManagerDailyHours";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import DateRangePicker from "../../common/DatePicker/DateRangePicker";

const ManagerTimeSummary = () => {
  return (
    <LayoutDesign>
      <BreadCrumb pageName=" Manager Timesummart" />
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
      <ManagerTotalHoursbyResources />
      <ManagerHourByProject />
      <ManagerHourByCompany />
      <ManagerBillingDistribution />
      <ManagerApprovelBillingStatus />
      <ManagerDailyHours />
      <ManagerProjectTimeUtilization />
    </LayoutDesign>
  );
};

export default ManagerTimeSummary;
