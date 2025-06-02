import React from "react";
import bgimage from "../../assets/commonIcon/profilepic.png";
import EditIcon from "@mui/icons-material/Edit";
import {Button, Grid2} from "@mui/material";
import CardOne from "../../common/cardOne/CardOne";

// Function to handle null values
const getValue = (value) => value || "No data available";
function CompanyTable({company, isOpen, setIsOpen, setIsEdit, setIsId}) {
  console.log(company);
  const handleclick = (value) => {
    setIsOpen(true);
    setIsEdit(value);
    setIsId(value.Company_Id);
  };
  return (
    <>
      <div className="Company_card_wrapper">
        <div className="company_card_box">
          <div className="company_card_header">
            <img src={bgimage} alt="" srcset="" />
            <div className="company_header_tags">
              <img src={`${company.Company_Logo}`} alt="" srcset="" />

              <Button
                onClick={() => {
                  setIsEdit(company);
                  setIsOpen(true);
                }}
                startIcon={<EditIcon />}
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                }}
              >
                Edit Company
              </Button>
            </div>
          </div>

          <div className="company_body">
            <div className="company_head_body">
              <h1>{company.Company_Name}</h1>
            </div>
            <Grid2 container spacing={3}>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Email"
                  paragraph={company?.Company_Email}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Address"
                  paragraph={company?.Address}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Postal Code"
                  paragraph={company?.Postal_Code}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Phone"
                  paragraph={company?.Phone}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Establshed Date"
                  paragraph={company?.Established_date}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="No of Employee"
                  paragraph={company?.Employee_No}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="GST no"
                  paragraph={company?.Tex_Number || "none"}
                />
              </Grid2>
              <Grid2 size={{md: 4, sm: 6, xs: 12, lg: 4}}>
                <CardOne
                  icon={<EditIcon />}
                  title="Company Website"
                  paragraph={
                    (
                      <a href={`${company?.CompanyWesite}`}>
                        {company?.CompanyWesite}
                      </a>
                    ) || "none"
                  }
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(CompanyTable);
