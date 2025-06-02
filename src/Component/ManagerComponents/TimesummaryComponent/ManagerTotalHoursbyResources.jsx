import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
const ManagerTotalHoursbyResources = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "staff-hour-chart",
    },
    xaxis: {
      categories: [],
    },
    yaxis: [
      {
        title: {
          text: "Total Hours",
        },
      },
      {
        opposite: true,
        title: {
          text: "Total Billed Hours",
        },
      },
    ],
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Hours",
      data: [],
    },
    {
      name: "Total Billed Hours",
      data: [],
    },
  ]);

  // Fetch data from API
  const fetchmanagertotalhoursbyresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/manager-dash-total-hour-by-resources"
      ); // Adjust the API path if needed
      const result = response.data.result;

      const staffNames = result.StaffName || [];
      const totalHours = result.totalHours || [];
      const totalBilledHours = result.totalBilledHours || [];

      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories: staffNames,
        },
      });

      setChartSeries([
        {name: "Total Hours", data: totalHours},
        {name: "Total Billed Hours", data: totalBilledHours},
      ]);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchmanagertotalhoursbyresourcesfunc();
  }, [0]);
  return (
    <div>
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Total hours by Resources
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
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

export default ManagerTotalHoursbyResources;
