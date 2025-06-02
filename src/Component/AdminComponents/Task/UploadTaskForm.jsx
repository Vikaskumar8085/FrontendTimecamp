import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

const UploadTaskForm = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        setCsvData(rows);
        setLoading(false);
      };
      reader.readAsText(values.file);
    },
  });

  const handleFilePreview = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        setPreviewData(rows.slice(0, 5));
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{mt: 4, p: 3,  borderRadius: 2}}>
        <Typography variant="h5" gutterBottom>
          Upload Project
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFilePreview}
            onBlur={formik.handleBlur("file")}
            style={{marginTop: 16}}
          />
          {formik.touched.file && formik.errors.file && (
            <Typography color="error" variant="body2">
              {formik.errors.file}
            </Typography>
          )}
          {previewData.length > 0 && (
            <Box sx={{mt: 2, maxHeight: 200, overflowY: "auto"}}>
              <Typography variant="subtitle1">File Preview:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    {previewData[0]?.map((header, index) => (
                      <TableCell key={index}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{mt: 2}}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Box>

      {csvData.length > 0 && (
        <Box sx={{mt: 4}}>
          <Typography variant="h6">Full CSV Data:</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {csvData[0]?.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {csvData.slice(1).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default UploadTaskForm;
