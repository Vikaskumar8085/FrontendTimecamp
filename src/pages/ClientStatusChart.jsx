import React, {useMemo} from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import Chart from "react-apexcharts";
import {FaSmile, FaFrown} from "react-icons/fa";

const generateFakeClients = () =>
  Array.from({length: 100}, (_, i) => {
    const status = i < 30 ? "Active" : i < 70 ? "Inactive" : "Dead";
    const sentiment = i % 2 === 0 ? "Positive" : "Negative";
    return {id: i + 1, name: `Client ${i + 1}`, status, sentiment};
  });

const ClientStatusChart = () => {
  const theme = useTheme();
  const clients = useMemo(() => generateFakeClients(), []);

  const positiveClients = clients.filter((c) => c.sentiment === "Positive");
  const negativeClients = clients.filter((c) => c.sentiment === "Negative");

  const data = [
    {
      label: "Positive Clients",
      value: positiveClients.length,
      change: 5.4,
      // upward trend: positive values increasing
      chartData: positiveClients.slice(0, 6).map((_, i) => 10 + i * 5),
      icon: <FaSmile className="text-green-600" />,
      color: theme.palette.success.main,
    },
    {
      label: "Negative Clients",
      value: negativeClients.length,
      change: -3.7,
      // downward trend: negative values increasing in magnitude (more negative)
      chartData: negativeClients.slice(0, 6).map((_, i) => -(10 + i * 5)),
      icon: <FaFrown className="text-red-600" />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Grid container spacing={3}>
      {data.map(({label, value, change, chartData, icon, color}, index) => {
        const isPositiveChart = chartData.every((val) => val >= 0);
        const chartOptions = {
          chart: {
            id: `sparkline-${index}`,
            sparkline: {enabled: true},
          },
          stroke: {curve: "smooth", width: 2},
          colors: [color],
          yaxis: {
            min: Math.min(...chartData) * 1.2,
            max: Math.max(...chartData) * 1.2,
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (val) => `${isPositiveChart ? val : -val} Clients`,
            },
          },
        };

        return (
          <Grid item xs={12} sm={6} md={6} key={index}>
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
                    color={isPositiveChart ? "success.main" : "error.main"}
                  >
                    {isPositiveChart ? "▲" : "▼"} {Math.abs(change)}%
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1} mb={2}>
                  {icon}
                  <Typography variant="h5" fontWeight="bold">
                    {value} Clients
                  </Typography>
                </Box>

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

export default ClientStatusChart;
