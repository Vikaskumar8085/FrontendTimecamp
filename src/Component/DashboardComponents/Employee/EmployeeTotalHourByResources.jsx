import React, {useState} from "react";
import {Paper, Typography, CircularProgress} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";

const EmployeeTotalHourByResources = () => {
  const [chartData, setChartData] = useState(null);
  const [staffName, setStaffName] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchtotalhoursbyresourcesfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/employee/fetch-employee-total-hours-by-resources"
      );
      if (response.data.success) {
        const {result} = response.data;
        setStaffName(result.StaffName);

        // Generate labels for each timesheet entry (modify if you have date info)
        const labels = result.totalHours.map(
          (_, index) => `Entry ${index + 1}`
        );

        // Prepare ApexCharts series data
        const series = [
          {
            name: "Total Hours",
            data: result.totalHours,
          },
          {
            name: "Billed Hours",
            data: result.totalBilledHours,
          },
        ];

        // Define chart options
        const options = {
          chart: {
            type: "bar",
          },
          title: {
            text: `${result.StaffName}'s Hours Overview`,
          },
          xaxis: {
            categories: labels,
          },
          yaxis: {
            title: {
              text: "Hours",
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
            },
          },
          dataLabels: {
            enabled: true,
          },
        };

        setChartData({series, options});
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  React.useEffect(() => {
    fetchtotalhoursbyresourcesfunc();
  }, [0]);

  if (loading) {
    return (
      <div
        style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Paper sx={{p: 3, mt: 3}}>
        <Typography variant="h5" align="center" gutterBottom>
          {staffName
            ? `${staffName}'s Hours Overview`
            : "Employee Hours Overview"}
        </Typography>
        {chartData ? (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        ) : (
          <Typography align="center">No data available</Typography>
        )}
      </Paper>
    </div>
  );
};

export default EmployeeTotalHourByResources;
