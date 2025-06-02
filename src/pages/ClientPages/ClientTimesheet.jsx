import React, {useEffect, useState} from "react";
import {Grid2, Button} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientprojecttimesheetapicall} from "../../ApiServices/Cllientapiservices/Client";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import InputSearch from "../../common/InputSearch/InputSearch";
import StatCard from "../../common/StatCard/StatCard";
import Pagination from "../../common/Pagination/Pagination";

const ClientTimesheet = () => {
  const [isClientTimesheetdata, setIsClientTimesheetdata] = useState([]);
  console.log(isClientTimesheetdata, ".../...");
  const fetchclienttimesheetfunc = async () => {
    try {
      const response = await fetchclientprojecttimesheetapicall();
      if (response.success) {
        setIsClientTimesheetdata(response.result);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    }
  };

  // timesheet

  const stats = [
    {
      label: "Total Hours",
      value: isClientTimesheetdata.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: isClientTimesheetdata.length,
      icon: <ListIcon color="secondary" />,
    },
    {
      label: "Total Billed Hours",
      value: isClientTimesheetdata.reduce(
        (sum, item) => sum + (item.billed_hours || 0),
        0
      ),
      icon: <ReceiptIcon color="success" />,
    },
    {
      label: "Total OK Hours",
      value: isClientTimesheetdata.reduce(
        (sum, item) => sum + (item.ok_hours || 0),
        0
      ),
      icon: <CheckCircleIcon color="primary" />,
    },
  ];
  // timesheet

  useEffect(() => {
    fetchclienttimesheetfunc();
  }, [0]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Client Timesheet" />

      <div
        style={{
          display: "block",
          overflow: "hidden",
          position: "relative",
          margin: "10px 0px",
        }}
        className="client_header_container"
      >
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

        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div className="left_div">{/* <Button>Sort</Button> */}</div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
      </div>

      {/* <Grid container spacing={2} sx={{my: 1}}>
        {stats.map((stat, index) => (
          <Grid item sm={12} md={3} lg={3} key={index}>
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
              {stat.icon}
              <Typography variant="h6">
                {stat.label}: {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* <TableContainer
        component={Paper}
        sx={{mt: 3, boxShadow: 3, borderRadius: 2}}
      >
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: "#f5f5f5"}}>
              <TableCell>
                <strong>TS Code</strong>
              </TableCell>
              <TableCell>
                <strong>Project ID</strong>
              </TableCell>
              <TableCell>
                <strong>Staff ID</strong>
              </TableCell>
              <TableCell>
                <strong>Task Description</strong>
              </TableCell>
              <TableCell>
                <strong>Approval Status</strong>
              </TableCell>
              <TableCell>
                <strong>Billed Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Billing Status</strong>
              </TableCell>
              <TableCell>
                <strong>Blank Hours</strong>
              </TableCell>
              <TableCell>
                <strong>OK Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Total Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Remarks</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isClientTimesheetdata?.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.ts_code}</TableCell>
                <TableCell>{entry.project}</TableCell>
                <TableCell>{entry.Staff_Id}</TableCell>
                <TableCell>{entry.task_description}</TableCell>
                <TableCell>
                  <Chip
                    label={entry.approval_status}
                    color={
                      entry.approval_status === "APPROVED"
                        ? "success"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>{entry.billed_hours} hrs</TableCell>
                <TableCell>{entry.billing_status}</TableCell>
                <TableCell>{entry.blank_hours} hrs</TableCell>
                <TableCell>{entry.ok_hours} hrs</TableCell>
                <TableCell>{entry.hours} hrs</TableCell>
                <TableCell>{entry.remarks}</TableCell>
                <TableCell>
                  {new Date(entry.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Pagination />
    </LayoutDesign>
  );
};

export default ClientTimesheet;
