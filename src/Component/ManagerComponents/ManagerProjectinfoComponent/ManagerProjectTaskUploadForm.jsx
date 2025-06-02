import {useState} from "react";
import Grid2 from "@mui/material/Grid2";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";

const ManagerProjectTaskUploadForm = ({uploadhandlesubmit}) => {
  const [file, setFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "afsaldflksdfl");
    uploadhandlesubmit(formData);

    setFile(null);
  };

  const getprojectcsvdownload = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/project-csv-download",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/csv",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Project.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 2,
            p: 1,
          }}
        >
          <Typography variant="h5">Upload Project</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              <Grid2 size={{xs: 12}}>
                <InputFileupload
                  type="file"
                  inputProps={{accept: ".csv"}}
                  fullWidth
                  onChange={handleFileChange}
                />
              </Grid2>
              <Grid2 size={{xs: 12}}>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => getprojectcsvdownload()}
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  Project CSV Format
                </Button>
              </Grid2>
              <Grid2 size={{xs: 12}}>
                <Button
                  type="submit"
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ManagerProjectTaskUploadForm;
