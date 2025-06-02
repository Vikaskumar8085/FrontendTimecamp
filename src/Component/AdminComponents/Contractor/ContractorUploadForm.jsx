import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Papa from "papaparse";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";

const ContractorUploadForm = ({uploadcontractorcsvupload, setIsUpload}) => {
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data), setOpenDialog(true);
      },
      header: true,
      skipEmptyLines: true,
    });
  };
  console.log(file, "///////////");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "afsaldflksdfl");
    uploadcontractorcsvupload(formData);
    setFile(null);
  };
  const getcontractorcsvformate = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/contractor-csv-download",
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
      a.download = "Contractor.csv";
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
          <Typography variant="h5">Upload Contractor</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              <Grid2 size={{sm: 12}}>
                <InputFileupload
                  type="file"
                  inputProps={{accept: ".csv"}}
                  fullWidth
                  onChange={handleFileChange}
                />
              </Grid2>
              <Grid2 size={{sm: 12}}>
                <Button
                  onClick={() => getcontractorcsvformate()}
                  startIcon={<DownloadIcon />}
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  Contractor Csv formate
                </Button>
              </Grid2>

              <Grid2 size={{sm: 12}}>
                <Button
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    width: "100%",
                  }}
                  type="submit"
                >
                  submit
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Client Upload and Preview CSV File</DialogTitle>
        <DialogContent>
          {csvData.length > 0 && (
            <TableContainer component={Paper} sx={{mt: 2}}>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(csvData[0]).map((key, index) => (
                      <TableCell key={index} sx={{fontWeight: "bold"}}>
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Object.values(row).map((val, colIndex) => (
                        <TableCell key={colIndex}>{val}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsUpload(false), setOpenDialog(false);
            }}
          >
            close
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContractorUploadForm;
