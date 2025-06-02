import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import apiInstance from "../../../ApiInstance/apiInstance";
import Grid from "@mui/material/Grid2";
import StatCard from "../../../common/StatCard/StatCard";

const Clientdashboarheader = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalHours: 0,
    chartData: [],
    trendDown: false,
    percentage: 0,
  });
  console.log(stats);

  const fetchclientdashboardheaderfunc = async () => {
    try {
      const response = await apiInstance.get("/v2/client/client-dash-counter");
      if (response?.data?.success) {
        setStats(response?.data?.result);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    fetchclientdashboardheaderfunc();
  }, [0]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{md: 3, sm: 12, lg: 3}}>
          <StatCard
            title="Total Work Hours"
            value={stats.totalHours}
            unit="hrs"
            trendDown={stats.trendDown}
            percentage={stats.percentage}
            chartData={stats.chartData.map((item) => item.hours)} // for chart
          />
        </Grid>
        <Grid size={{md: 3, sm: 12, lg: 3}}>
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            unit=""
            trendDown={false}
            percentage={0}
            chartData={stats.chartData.map((item) => item.hours)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Clientdashboarheader;
