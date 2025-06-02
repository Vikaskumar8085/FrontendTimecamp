import React, {useEffect, useState} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Grid2, Typography} from "@mui/material";
import TotalHourbyResource from "../../../Component/TimeSummarycomponent/TotalHourbyResource";
import BilledHoursByProject from "../../../Component/TimeSummarycomponent/BilledHoursByProject";
import {fetchtotalhourbyresourcesapicall} from "../../../ApiServices/TimesheetApiServices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import BIlledandNotbilledproject from "../../../Component/TimeSummarycomponent/BIlledandNotbilledproject";
import HourByProject from "../../../Component/TimeSummarycomponent/HourByProject";
import DailyHours from "../../../Component/TimeSummarycomponent/DailyHours";
import Hourbycompany from "../../../Component/TimeSummarycomponent/Hourbycompany";
import ProjectTimeUtilization from "../../../Component/TimeSummarycomponent/ProjectTimeUtilization";
import ApprovelByBillingChart from "../../../Component/TimeSummarycomponent/ApprovelByBillingChart";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import DateRangePicker from "../../../common/DatePicker/DateRangePicker";

const TimesheetSummary = () => {
  const dispatch = useDispatch();
  const [istotalhourbyresourcedata, setistotalhourbyresourcedata] = useState(
    []
  );

  const fetchtotalhourbyresourcedata = async () => {
    try {
      // dispatch(setLoader(true));
      const response = await fetchtotalhourbyresourcesapicall();
      if (response.success) {
        setistotalhourbyresourcedata(response.result);
        // dispatch(setLoader(true));
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchtotalhourbyresourcedata();
  }, [0]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Time Summary" />
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
          <Typography variant="h5">Total hours By Resourse</Typography>
          <TotalHourbyResource
            istotalhourbyresourcedata={istotalhourbyresourcedata}
          />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Hour by Company</Typography>
          <Hourbycompany />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">hours By Project</Typography>
          <HourByProject />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Billing Status Distribution</Typography>
          <BIlledandNotbilledproject />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">DailyHours</Typography>
          <DailyHours />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Approval and Billing Over Time</Typography>
          <ApprovelByBillingChart />
        </Grid2>
        <Grid2 size={{sm: 12}}>
          <Typography variant="h5">Project Time Utilization</Typography>
          <ProjectTimeUtilization />
        </Grid2>
      </Grid2>
    </LayoutDesign>
  );
};

export default TimesheetSummary;
