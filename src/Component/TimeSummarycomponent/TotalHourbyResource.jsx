import React from "react";
import Chart from "react-apexcharts";

const TotalHourbyResource = ({istotalhourbyresourcedata}) => {
  const categories = istotalhourbyresourcedata.map((item) => item.resourceName);
  const totalHours = istotalhourbyresourcedata.map((item) =>
    parseInt(item.totalHour, 10)
  );
  const billedHours = istotalhourbyresourcedata.map((item) => item.billedhour);
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: "Resource Hours",
      align: "center",
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

  const series = [
    {
      name: "Total Hours",
      data: totalHours,
    },
    {
      name: "Billed Hours",
      data: billedHours,
    },
  ];
  return (
    <>
      <div>
        <Chart options={chartOptions} series={series} type="bar" height={350} />
      </div>
    </>
  );
};

export default TotalHourbyResource;
