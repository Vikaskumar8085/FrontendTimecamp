import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import FolderKanbanIcon from "@mui/icons-material/Folder"; // Replace if custom icon needed
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Replace if using custom ClockIcon

const ClientProfile = () => {
  const clientInfo = [
    {
      icon: "/email-icon.png",
      label: "Email",
      value: "adrian.marshall@example.com",
    },
    {
      icon: "/phone-icon.png",
      label: "Phone",
      value: "+91 9876543210",
    },
    {
      icon: "/company-icon.png",
      label: "Company",
      value: "Tech Solutions Ltd.",
    },
    {
      icon: "/job-icon.png",
      label: "Job Title",
      value: "Project Manager",
    },
  ];

  const avatarUrl = "https://randomuser.me/api/portraits/men/75.jpg"; // Use your actual image URL

  return (
    <Box component="main" sx={{ml: "260px", pt: "119px", pr: 6}}>
      <Box>
        <Typography variant="h5" fontWeight="bold" color="black">
          Clients
        </Typography>
        <Typography
          variant="body1"
          fontWeight="medium"
          color="text.secondary"
          mt={2}
        >
          Clients {">"} Client Profile
        </Typography>
      </Box>

      <Card
        sx={{
          width: "100%",
          mt: "25px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Banner Image */}
        <Box sx={{height: "132px", width: "100%", overflow: "hidden"}}>
          <img
            src={
              "https://plus.unsplash.com/premium_photo-1667912925305-629794bdb691?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Banner"
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>

        {/* Profile Avatar with image */}
        <Box
          sx={{
            position: "absolute",
            left: "52%",
            top: "35%",
            transform: "translateX(-50% ,-50%)",
          }}
        >
          <Avatar
            src={avatarUrl}
            alt="Adrian Marshall"
            sx={{
              width: "120px",
              height: "120px",
              bgcolor: "#d8edff",
              border: "4px solid white",
              boxShadow: "0px 16px 16px #00000014",
            }}
          />
        </Box>

        <CardContent sx={{pt: "80px", pb: 6}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" fontWeight="600" align="center">
              Adrian Marshall
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <img src="/image.png" alt="Location" width={17} height={17} />
              <Typography
                variant="body1"
                fontWeight="medium"
                color="text.secondary"
              >
                Mumbai, Maharashtra, India
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              mt: 4,
            }}
          >
            {clientInfo.map((info, index) => (
              <Box key={index} display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundImage: `url(${info.icon})`,
                      backgroundSize: "100% 100%",
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="text.secondary"
                  >
                    {info.label}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color="black"
                  ml={3}
                  mt={1}
                >
                  {info.value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box display="flex" justifyContent="center" gap={2} mt={6}>
            <Button
              variant="outlined"
              sx={{
                height: 44,
                color: "primary.main",
                borderColor: "primary.main",
                borderRadius: "12px 12px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FolderKanbanIcon sx={{width: 24, height: 24}} />
              Projects
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: 44,
                borderRadius: "12px 12px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccessTimeIcon sx={{width: 24, height: 24}} />
              Timesheet
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientProfile;
