import React, {useEffect, useState} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";
import {Card, CardContent, Typography, CircularProgress} from "@mui/material";
import Chart from "react-apexcharts";
import moment from "moment";
const RecentProject = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProjects = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-recent-project"
      );
      if (response.data.success) {
        setData(response.data.result);
      } else {
        setError(response.data.message || "Failed to fetch data.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
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

  // Ensure data exists
  if (!data || !data.ProjectName) {
    return (
      <Typography align="center" sx={{mt: 4}}>
        No project data available.
      </Typography>
    );
  }

  // Prepare Data for ApexCharts
  const chartOptions = {
    chart: {
      type: "rangeBar",
      toolbar: {show: false},
    },
    xaxis: {
      categories: data.ProjectName,
      title: {text: "Projects"},
    },
    yaxis: {
      labels: {
        formatter: (val) => moment(val).format("MMM DD, YYYY"),
      },
      title: {text: "Timeline"},
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {enabled: false},
  };

  const chartSeries = [
    {
      name: "Project Duration",
      data: data.ProjectName.map((name, index) => ({
        x: name,
        y: [
          moment(data.startdata[index], "DD/MM/YYYY").valueOf(), // Convert start date
          moment(data.enddata[index], "DD/MM/YYYY").valueOf(), // Convert end date
        ],
      })),
    },
  ];

  return (
    <div>
      <Card sx={{mt: 4, p: 2}}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Recent Projects Timeline
          </Typography>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="rangeBar"
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentProject;
