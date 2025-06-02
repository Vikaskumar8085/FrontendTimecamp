import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchcontractorprojectinformationapicall} from "../../../ApiServices/ContractorApiServices/ContractorApiServices";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import Chart from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";

const ContractorProjectinformation = ({id}) => {
  const [IsprojectInfodata, setIsprojectInfodata] = useState([]);
  const [data, setData] = useState(null);
  console.group(data, "data");
  const [loading, setLoading] = useState(true);

  const fetchcontractorprojectinfofunc = async () => {
    try {
      const response = await fetchcontractorprojectinformationapicall(id);
      if (response.success) {
        setIsprojectInfodata(response.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const fetchContractorsingleprojectchartfunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/contractor/fetch-contractor-single-project-chart/${id}`
      );
      if (response.data.success) {
        setData(response?.data?.result);
      }
    } catch (error) {
      console.error("Error fetching contractor chart data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcontractorprojectinfofunc();
    fetchContractorsingleprojectchartfunc();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!data) return <Typography>No data available</Typography>;

  const chartOptions = {
    chart: {
      id: "project-chart",
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    xaxis: {
      type: "datetime",
    },
    title: {
      text: `Project Duration: ${data?.ProjectName}`,
      align: "center",
      style: {fontSize: "20px"},
    },
  };

  const chartSeries = [
    {
      name: "Project Timeline",
      data: [
        {
          x: data?.ProjectName,
          y: [
            new Date(data.Start_Date).getTime(),
            new Date(data.End_Date).getTime(),
          ],
        },
      ],
    },
  ];

  const content = IsprojectInfodata.map((project, index) => {
    return (
      <>
        <Card sx={{maxWidth: 600, m: 2, p: 2, boxShadow: 3, borderRadius: 2}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {project.Project_Name} ({project.Project_Code})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Type: {project.Project_Type}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Manager:</strong> {project.Manager_Name}
            </Typography>

            <Typography variant="body1">
              <strong>Project Hours:</strong> {project.Project_Hours} hrs
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              {project.Project_Status ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body1">
              <strong>Start Date:</strong> {project.Start_Date}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {project.End_Date}
            </Typography>

            <Box mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Team Members:
              </Typography>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                {project.Team.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  });

  return (
    <>
      <BreadCrumb pageName="Contractor Project information" />
      {content}
      <Box mt={4}>
        <Paper elevation={3} sx={{p: 3}}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="rangeBar"
            height={200}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ContractorProjectinformation;
