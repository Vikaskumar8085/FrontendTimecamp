import React, {useEffect, useState} from "react";
import apiInstance from "../../ApiInstance/apiInstance";
import ApexCharts from "react-apexcharts";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
const ClientApprovelbilledOverTime = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    total_hours: [],
    billed_hours: [],
    days: [],
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "range-bar-chart",
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true, // Display bars horizontally
        rangeBarGroupRows: true, // Group range bars into rows
      },
    },
    xaxis: {
      categories: [], // Days will go here
    },
    yaxis: {
      title: {
        text: "Projects/Days",
      },
    },
    title: {
      text: "Overtime & Billed Hours per Day (Range Bar)",
      align: "center",
    },
    legend: {
      position: "top",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Hours",
      data: [], // Total hours data will go here
    },
    {
      name: "Billed Hours",
      data: [], // Billed hours data will go here
    },
  ]);
  const fetchclientapprovelbilledovertimefunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-approvel-billing-status-distribution"
      );
      const {total_hours, billed_hours, days} = response.data;

      // Update chart options and series with fetched data
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: days, // Days for the x-axis
        },
      }));

      // Prepare the data for the range bar chart
      const seriesData = days.map((day, index) => ({
        x: day, // Day as x-axis label
        y: [0, total_hours[index]], // Total hours as range [start, end]
        y2: [0, billed_hours[index]], // Billed hours as range [start, end]
      }));

      setChartSeries([
        {name: "Total Hours", data: seriesData.map((d) => d.y)},
        {name: "Billed Hours", data: seriesData.map((d) => d.y2)},
      ]);

      setChartData({total_hours, billed_hours, days});
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
    fetchclientapprovelbilledovertimefunc();
  }, [0]);
  return (
    <div>
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Overtime Hours and Billed Hours per Day
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="rangeBar"
                height={350}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default ClientApprovelbilledOverTime;
