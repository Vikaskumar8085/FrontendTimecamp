import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import Chart from "react-apexcharts";

const dashboardData = [
  {
    label: "Revenue",
    value: 125000,
    change: 8.5,
    chartData: [100, 105, 110, 120, 125, 130],
  },
  {
    label: "Expenses",
    value: 54000,
    change: -3.2,
    chartData: [55, 57, 56, 54, 53, 52],
  },
  {
    label: "Customers",
    value: 3200,
    change: 5.1,
    chartData: [2800, 2900, 3000, 3100, 3200, 3300],
  },
  {
    label: "New Orders",
    value: 785,
    change: -1.7,
    chartData: [800, 790, 795, 785, 780, 770],
  },
];

const DashboardCounter = () => {
  const theme = useTheme();
  const data = [
    {
      label: "Revenue",
      value: 125000,
      change: 8.5,
      chartData: [100, 105, 110, 120, 125, 130],
    },
    {
      label: "Expenses",
      value: 54000,
      change: -3.2,
      chartData: [55, 57, 56, 54, 53, 52],
    },
    {
      label: "Customers",
      value: 3200,
      change: 5.1,
      chartData: [2800, 2900, 3000, 3100, 3200, 3300],
    },
    {
      label: "New Orders",
      value: 785,
      change: -1.7,
      chartData: [800, 790, 795, 785, 780, 770],
    },
  ];
  
  return (
    <Grid container spacing={3}>
      {data.map(({label, value, change, chartData}, index) => {
        const isPositive = change >= 0;

        const chartOptions = {
          chart: {
            id: `sparkline-${index}`,
            sparkline: {enabled: true},
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          colors: [isPositive ? "#4caf50" : "#f44336"],
          tooltip: {
            enabled: true,
            y: {formatter: (val) => `$${val}`},
          },
        };

        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color={isPositive ? "success.main" : "error.main"}
                  >
                    {isPositive ? "▲" : "▼"} {Math.abs(change)}%
                  </Typography>
                </Box>

                <Typography variant="h5" fontWeight="bold" mt={1} mb={2}>
                  ${value.toLocaleString()}
                </Typography>

                <Chart
                  options={chartOptions}
                  series={[{data: chartData}]}
                  type="area"
                  height={60}
                  width="100%"
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardCounter;
