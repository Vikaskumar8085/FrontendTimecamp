import React, {useEffect, useState} from "react";
import apiInstance from "../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {Paper, Typography, CircularProgress, Grid} from "@mui/material";

const ClientTotalhourbyCompany = () => {
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "Hours by Company",
      type: "bar", // Use 'bar' chart for visualizing different total hours
    },
    xaxis: {
      categories: [
        "Total Hours",
        "Total Ok Hours",
        "Total Billed Hours",
        "Total Blank Hours",
      ], // Categories of metrics
    },
    yaxis: {
      title: {
        text: "Hours",
      },
    },
    title: {
      text: "Total Hours By Company",
      align: "center",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Hours",
      data: [], // To store the total hours for each metric
    },
  ]);

  const fetchclienttotalhourbycompanyfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-total-hour-by-company"
      );
      const metrics = response.data;
      const metricData = [
        metrics.totalhours,
        metrics.totalOkHours,
        metrics.totalBilledHours,
        metrics.totalBlankHours,
      ];
      setChartSeries([{name: "Total Hours", data: metricData}]);
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchclienttotalhourbycompanyfunc();
  }, [0]);
  return (
    <div>
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Hours By Company
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default ClientTotalhourbyCompany;
