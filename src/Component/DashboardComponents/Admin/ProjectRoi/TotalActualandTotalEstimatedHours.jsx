import React, {useEffect, useState} from "react";
import apiInstance from "../../../../ApiInstance/apiInstance";
import {Card, CardContent, Typography, CircularProgress} from "@mui/material";
import Chart from "react-apexcharts";
const TotalActualandTotalEstimatedHours = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjectROI = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-project-roi"
      );
      if (response.data.success) {
        setData(response.data.result);
      } else {
        setError(response.data.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchProjectROI();
  }, []);

  if (loading) {
    return (
      <Typography align="center" sx={{mt: 4}}>
        <CircularProgress />
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" align="center" sx={{mt: 4}}>
        {error}
      </Typography>
    );
  }

  // Prepare Data for ApexCharts
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {show: false},
    },
    xaxis: {
      categories: data.map((item) => item.FirstName || "N/A"),
      title: {text: "Projects"},
    },
    yaxis: {
      title: {text: "Time (hours)"},
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {enabled: false},
  };

  const chartSeries = [
    {
      name: "Estimated Time",
      data: data.map((item) => item.TotalEstimatedTime || 0),
    },
    {
      name: "Completed Time",
      data: data.map((item) => item.TotalCompletedTime || 0),
    },
  ];

  return (
    <div>
      {" "}
      <Card sx={{mt: 4, p: 2}}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Project ROI - Estimated vs Completed Time
          </Typography>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalActualandTotalEstimatedHours;
