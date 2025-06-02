import {Box, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import moment from "moment";
import Chart from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";
const RecentProjects = () => {
  const [chartData, setChartData] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/admin-dash/fetch-dash-recent-project"
      );
      console.log("recenter project", response);
      if (response.data.success) {
        const formattedData = response.data.result.map((project) => ({
          x: project.Project_Name,
          y: [
            new Date(project.Start_Date).getTime(),
            new Date(project.End_Date).getTime(),
          ],
          Start_Date: moment(project.Start_Date).format("YYYY-MM-DD"),
          End_Date: moment(project.End_Date).format("YYYY-MM-DD"),
        }));
        setChartData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const options = {
    chart: {
      type: "rangeBar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      y: {
        formatter: (value, {seriesIndex, dataPointIndex, w}) => {
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          return `Start: ${data.Start_Date} <br> End: ${data.End_Date}`;
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, {seriesIndex, dataPointIndex, w}) => {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        return `${data.Start_Date} - ${data.End_Date}`;
      },
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
  };

  useEffect(() => {
    fetchProjects();
  }, [0]);

  return (
    <Box sx={{my: 2}} component={Paper}>
      <Typography>
        <strong>Recent Project</strong>
      </Typography>

      <div>
        <Chart
          options={options}
          series={[{data: chartData}]}
          type="rangeBar"
          height={350}
        />
      </div>
    </Box>
  );
};

export default RecentProjects;
