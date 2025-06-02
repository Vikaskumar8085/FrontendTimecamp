import {Grid2, Paper} from "@mui/material";
import React from "react";
import Card from "../../common/Card/Card";

const Admindashboard = () => {
  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size={{xs: 12, md: 3, lg: 3, sm: 6}}>
          <Card>1</Card>
        </Grid2>{" "}
        <Grid2 size={{xs: 12, md: 3, lg: 3, sm: 6}}>
          <Card>1</Card>
        </Grid2>{" "}
        <Grid2 size={{xs: 12, md: 3, lg: 3, sm: 6}}>
          <Card>1</Card>
        </Grid2>{" "}
        <Grid2 size={{xs: 12, md: 3, lg: 3, sm: 6}}>
          <Card>1</Card>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Admindashboard;
