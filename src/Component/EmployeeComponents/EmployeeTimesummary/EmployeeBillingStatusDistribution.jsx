import apiInstance from "../../../ApiInstance/apiInstance";
import React, {useEffect, useState} from "react";
import {Box, Typography, CircularProgress} from "@mui/material";
import ApexCharts from "react-apexcharts";

const EmployeeBillingStatusDistribution = () => {
  const [chartData, setChartData] = useState({series: [], labels: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartOptions = {
    chart: {
      id: "billing-status-distribution",
      type: "pie",
    },
    labels: chartData.labels,
    colors: ["#FF5733", "#33FF57"], // Optional: customize the colors for the pie slices
    title: {
      text: "Billing Status Distribution",
      align: "center",
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom", // Legend position at the bottom
    },
  };
  const fetchcontractorbillingstatusdistributionfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-billing-status-distribution"
      );
      if (response?.data?.success) {
        const {BILLED, NOT_BILLED} = response.data.data;

        // Set data for the pie chart
        setChartData({
          series: [BILLED, NOT_BILLED],
          labels: ["Billed", "Not Billed"],
        });
      } else {
        setError("Failed to load data");
      }
    } catch (error) {
      setError(error.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchcontractorbillingstatusdistributionfunc();
  }, [0]);

  return (
    <div>
      <Box sx={{width: "100%", height: "400px"}}>
        <Typography variant="h6" gutterBottom>
          Contractor Billing Status Distribution
        </Typography>
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        {!loading && !error && (
          <ApexCharts
            options={chartOptions}
            series={chartData.series}
            type="pie"
            height={350}
          />
        )}
      </Box>
    </div>
  );
};

export default EmployeeBillingStatusDistribution;
