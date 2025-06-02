import React, {useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import apiInstance from "../../../ApiInstance/apiInstance";
import {Box} from "@mui/material";
import moment from "moment";

const ContractorRecentProject = () => {
  const [projects, setProjects] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "rangeBar",
        height: 350,
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
      fill: {
        opacity: 1,
      },
      title: {
        text: "Project Timeline",
      },
    },
  });

  const fetchcontractorrecentProjectfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/contractor/fetch-contractor-recent-project"
      );
      const {result} = response.data;

      if (result) {
        setProjects(response.data.result); // Assume the response data structure
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorrecentProjectfunc();
  }, [0]);
  useEffect(() => {
    // Format data for the range bar
    if (projects.length > 0) {
      const formattedData = projects.map((project) => ({
        x: project.ProjectName,
        y: [
          moment(project.startdate).valueOf(), // Use moment to get the timestamp
          moment(project.enddate).valueOf(), // Use moment to get the timestamp
        ],
      }));

      setChartData((prevState) => ({
        ...prevState,
        series: [
          {
            data: formattedData,
          },
        ],
      }));
    }
  }, [projects]);

  return (
    <>
      <Box my={3}>
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="rangeBar"
          height={450}
        />
      </Box>
    </>
  );
};

export default ContractorRecentProject;
