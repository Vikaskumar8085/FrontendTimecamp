import React, {useEffect, useState} from "react";
import {fetchcontractortaskapicall} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TextField,
  Link,
} from "@mui/material";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";

const ContractorTasks = () => {
  const [IsContracotorTaskdata, setIsContractorTaskdata] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  // Function to fetch contractor tasks
  const fetchContractorTaskfunc = async () => {
    try {
      const response = await fetchcontractortaskapicall({
        params: {
          page: page + 1,
          limit,
          search,
        },
      });
      if (response.success) {
        setIsContractorTaskdata(response.result);
        setTotalTasks(response.pagination.totalTasks);
        setTotalPages(response.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error?.message);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchContractorTaskfunc();
  }, [page, limit, search]);

  return (
    <div>
      <LayoutDesign>
        <BreadCrumb pageName="Contractor Task" />
        {/* Search bar */}
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{marginBottom: 2}}
        />
        {/* Task List Table */}
        <TableContainer component={Paper} sx={{mt: 3}}>
          <Typography variant="h6" sx={{p: 2}}>
            Task List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Attachment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsContracotorTaskdata.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.project?.join(", ")}</TableCell>
                  <TableCell>{task.milestones?.join(", ")}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>
                    {new Date(task.StartDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(task.EndDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.resources?.join(", ")}</TableCell>
                  <TableCell>{task.Status}</TableCell>
                  <TableCell>
                    {/* Handle attachment (File or Image) */}
                    {task.Attachment ? (
                      <Link
                        href={`${task.Attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{textDecoration: "none", color: "blue"}}
                      >
                        View Attachment
                      </Link>
                    ) : (
                      <Typography>No Attachment</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/contractor/taskinfo/${task.task_Id}`}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalTasks}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </LayoutDesign>
    </div>
  );
};

export default ContractorTasks;
