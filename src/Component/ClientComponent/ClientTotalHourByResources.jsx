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

const ClientTotalHourByResources = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {id: "staff-hour-chart"},
    xaxis: {categories: []},
    yaxis: [
      {title: {text: "Total Hours"}},
      {opposite: true, title: {text: "Total Billed Hours"}},
    ],
  });

  const [chartSeries, setChartSeries] = useState([
    {name: "Total Hours", data: []},
    {name: "Total Billed Hours", data: []},
  ]);

  const fetchTotalHoursByResources = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-total-hours-by-resources"
      );
      const result = response.data.result;

      if (!Array.isArray(result)) {
        throw new Error("Invalid response format");
      }

      const staffNames = result.map((item) => item.StaffName || "Unknown");
      const totalHours = result.map((item) => item.hours || 0);
      const totalBilledHours = result.map((item) => item.billed_hours || 0);

      setChartOptions((prev) => ({
        ...prev,
        xaxis: {categories: staffNames},
      }));

      setChartSeries([
        {name: "Total Hours", data: totalHours},
        {name: "Total Billed Hours", data: totalBilledHours},
      ]);

      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      console.error(error?.response?.data?.message || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchTotalHoursByResources();
  }, []); // ✅ Correct dependency array

  return (
    <Paper sx={{padding: 4, marginTop: 3}}>
      <Typography variant="h5" gutterBottom>
        Total hours by Resources
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
  );
};

export default ClientTotalHourByResources;
