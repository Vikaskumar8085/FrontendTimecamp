import {Box, Container, Grid, Grid2} from "@mui/material";
import React from "react";
import Card from "../../../common/Card/Card";

function AdminTable({isAdmindata}) {
  return (
    <>
      <Box sx={{display: "flex", flexWrap: "wrap"}}>
        <Grid2 container spacing={1}>
          {isAdmindata.map((item, index) => {
            return (
              <Grid2 size={{xs: 12, md: 6, lg: 6, sm: 6}}>
                <Card>
                  <div>FirstName : {item.FirstName}</div>
                  <div>LastName : {item.LastName}</div>
                  <div>Email : {item.Email}</div>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </>
  );
}

export default React.memo(AdminTable);
