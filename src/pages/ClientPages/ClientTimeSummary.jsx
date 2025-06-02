import React from "react";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Grid2} from "@mui/material";
import ClientTotalHourByResources from "../../Component/ClientComponent/ClientTotalHourByResources";
import ClientTotalHourByProject from "../../Component/ClientComponent/ClientTotalHourByProject";
import ClientTotalhourbyCompany from "../../Component/ClientComponent/ClientTotalhourbyCompany";
import ClientbillingstatusDistribution from "../../Component/ClientComponent/ClientbillingstatusDistribution";
import ClientProjectTimeutilization from "../../Component/ClientComponent/ClientProjectTimeutilization";
import ClinetDailyHours from "../../Component/ClientComponent/ClinetDailyHours";
import ClientApprovelbilledOverTime from "../../Component/ClientComponent/ClientApprovelbilledOverTime";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import DateRangePicker from "../../common/DatePicker/DateRangePicker";
import HeaderTab from "../../common/HeaderTab/HeaderTab";

const ClientTimeSummary = () => {
  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Client TIme Summary" />
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

        <Grid2 container spacing={3}>
          <Grid2 size={{sm: 12}}>
            <ClientTotalHourByResources />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientTotalHourByProject />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientTotalhourbyCompany />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientbillingstatusDistribution />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClinetDailyHours />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientApprovelbilledOverTime />
          </Grid2>
          <Grid2 size={{sm: 12}}>
            <ClientProjectTimeutilization />
          </Grid2>
        </Grid2>
      </LayoutDesign>
    </>
  );
};

export default ClientTimeSummary;
