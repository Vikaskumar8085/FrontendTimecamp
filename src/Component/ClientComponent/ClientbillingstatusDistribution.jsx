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

const ClientbillingstatusDistribution = () => {
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "metrics-chart",
      type: "pie", // Use pie chart type
    },
    labels: ["Billed", "Not Billed"], // Labels for each slice of the pie
    title: {
      text: "",
      align: "center",
    },
  });
  const [chartSeries, setChartSeries] = useState([]);

  const fetchclientbillingstatusdistributionfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-billing-status-distribution"
      );
      const data = response.data.data; // Assuming the data is inside the 'data' key

      const billedData = data.BILLED;
      const notBilledData = data.NOT_BILLED;

      setChartSeries([billedData, notBilledData]); // Set data for the pie chart
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
    fetchclientbillingstatusdistributionfunc();
  }, [0]);

  return (
    <div>
      {" "}
      <Paper sx={{padding: 4, marginTop: 3}}>
        <Typography variant="h5" gutterBottom>
          Billing status Distribution
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="pie"
                height={350}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default ClientbillingstatusDistribution;
