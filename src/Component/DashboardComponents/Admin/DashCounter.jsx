import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import {Card, CardContent, Typography, Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {admindashcounterapicall} from "../../../ApiServices/DashboardApiServices/admindashboard";
import {setadminNumberofdashboarddata} from "../../../redux/DashboardSlices/dashSlices";
// import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

const DashCounter = () => {
  const dispatch = useDispatch();
  const dashdata = useSelector((state) => state.dash.countervalues);

  const getValue = (value) => value || 0;

  const dataList = [
    {
      label: "Total Hours",
      value: getValue(dashdata?.totalHours),
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      label: "Staff Number",
      value: getValue(dashdata?.staffNo),
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      label: "Project Number",
      value: getValue(dashdata?.projectNo),
      icon: <WorkIcon fontSize="large" color="secondary" />,
    },
    {
      label: "Client Number",
      value: getValue(dashdata?.clientNo),
      icon: <BusinessIcon fontSize="large" color="success" />,
    },
  ];

  const pieData = dataList.map((item, index) => ({
    name: item.label,
    value: item.value,
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const fetchNumberofdashdatafunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await admindashcounterapicall();
      if (response.success) {
        dispatch(setadminNumberofdashboarddata(response.result));
      }
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchNumberofdashdatafunc();
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={2}>
        {dataList.map((item, index) => (
          <Grid item xs={12} sm={12} md={3} key={index}>
            <Card
              sx={{p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "#f5f5f5"}}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="h6">{item.value}</Typography>
                  {/* <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={[{name: item.label, value: item.value}]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        label
                      >
                        <Cell fill={COLORS[index % COLORS.length]} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashCounter;
