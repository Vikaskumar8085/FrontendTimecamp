import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../ApiInstance/apiInstance";
import toast from "react-hot-toast";
import {
  Card,
  Grid2,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {AccessTime, List, Receipt, CheckCircle} from "@mui/icons-material";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../common/EmptyFolder/Empty";
import StatCard from "../../common/StatCard/StatCard";
import Pagination from "../../common/Pagination/Pagination";
import InputSearch from "../../common/InputSearch/InputSearch";

const ClientProjectTime = () => {
  const [isclientprojectTimedata, setIsclientprojectTimedata] = useState([]);
  const fetchclientprojectTimefunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/client/fetch-client-project-time"
      );
      if (response?.data?.success) {
        setIsclientprojectTimedata(response?.data?.result);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
      toast.error(error?.response?.data?.message);
    }
  };

  const totalHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.TotalHours,
    0
  );
  const totalEntriesSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.TotalEntries,
    0
  );
  const totalBilledHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.BilledHours,
    0
  );
  const totalOkHoursSum = isclientprojectTimedata.reduce(
    (sum, item) => sum + item.OkHours,
    0
  );
  useEffect(() => {
    fetchclientprojectTimefunc();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Client Project TIme" />
      {/* <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              gap: 1,
            }}
          >
            <AccessTime color="primary" />
            <Typography variant="h6">Total Hours: {totalHoursSum}</Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <List color="secondary" />
            <Typography variant="h6">
              Total Entries: {totalEntriesSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Receipt color="success" />
            <Typography variant="h6">
              Total Billed Hours: {totalBilledHoursSum}
            </Typography>
          </Card>
        </Grid2>
        <Grid2 item sm={12} md={3} lg={3}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CheckCircle color="primary" />
            <Typography variant="h6">
              Total OK Hours: {totalOkHoursSum}
            </Typography>
          </Card>
        </Grid2>
      </Grid2> */}

      <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 size={{sm: 12, md: 3, lg: 3}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{sm: 12, md: 3, lg: 3}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{sm: 12, md: 3, lg: 3}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{sm: 12, md: 3, lg: 3}}>
          <StatCard />
        </Grid2>
      </Grid2>

      <InputSearch />

      {isclientprojectTimedata.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">Project Name</th>
              <th className="table_head_data">Total Hour </th>
              <th className="table_head_data">Total Entries </th>
              <th className="table_head_data">Total Billed Hours</th>
              <th className="table_head_data">Total Ok Hours</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {isclientprojectTimedata?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{item.ProjectName}</td>
                    <td className="table_data">{item.TotalHours}</td>
                    <td className="table_data">{item.TotalEntries}</td>
                    <td className="table_data">{item.BilledHours}</td>
                    <td className="table_data">{item.OkHours}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}

      <Pagination />
    </LayoutDesign>
  );
};

export default ClientProjectTime;
