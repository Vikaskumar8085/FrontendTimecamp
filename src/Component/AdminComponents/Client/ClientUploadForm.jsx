import {useState} from "react";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid2";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Papa from "papaparse";
import DownloadIcon from "@mui/icons-material/Download";
import InputFileupload from "../../../common/InputFileupload/InputFileupload";

function ClientUploadForm({uploadclientcsvhandlesubmit, setIsUpload}) {
  const [csvData, setCsvData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  console.log(csvData, ";csv data");

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    const file = event.target.files[0];
    if (!file) return;
    console.log(file, "filrsjlksdflsk");
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data), setOpenDialog(true);
      },
      header: true,
      skipEmptyLines: true,
    });
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
    uploadclientcsvhandlesubmit(formData);
    setFile(null);
  };
  // download client csv
  const getclientcsvformate = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/client-csv-download",
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
      a.download = "client.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error?.message);
    }
  };

  // download client csv

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth="sm" fullWidth>
        <Box sx={{mt: 2, p: 1}}>
          <Typography
            style={{fontSize: "20px", fontWeight: "bold", marginBottom: "16px"}}
          >
            Upload Client CSV
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid size={{sm: 12}}>
                <InputFileupload
                  type="file"
                  inputProps={{accept: ".csv"}}
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid size={{sm: 12}}>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => getclientcsvformate()}
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  Client Csv formate
                </Button>
              </Grid>
              <Grid size={{sm: 12}}>
                <Button
                  type="submit"
                  startIcon={<FileUploadIcon />}
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    width: "100%",
                  }}
                  // disabled={!formik.values.file}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
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
}

export default ClientUploadForm;
