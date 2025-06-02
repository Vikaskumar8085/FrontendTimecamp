import {useState} from "react";
import Grid2 from "@mui/material/Grid2";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Papa from "papaparse";
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
import toast from "react-hot-toast";
const UploadTask = ({uploadTaskhandlesubmit, setIsUploadTaskOpen}) => {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    uploadTaskhandlesubmit(formData);

    setFile(null);
  };

  const getTaskcsvdownload = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/task-csv-download",
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
      a.download = "Task.csv";
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
          <Typography variant="h5">Upload Task</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
              <Grid2 size={{xs: 12}}>
                <TextField
                  type="file"
                  inputProps={{accept: ".csv"}}
                  fullWidth
                  onChange={handleFileChange}
                />
              </Grid2>
              <Grid2 size={{xs: 12}}>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => getTaskcsvdownload()}
                  sx={{
                    background: "#2c3e50",
                    padding: "8px 10px",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  Task CSV Format
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
              setIsUploadTaskOpen(false), setOpenDialog(false);
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

export default UploadTask;
