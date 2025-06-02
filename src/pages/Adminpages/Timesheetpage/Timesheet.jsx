import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer, Grid, Grid2, Card, Typography} from "@mui/material";
import moment from "moment";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {fetchtimesheetapicall} from "../../../ApiServices/TimesheetApiServices";
import toast from "react-hot-toast";
import {uploadtimesheetcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  approvetimesheetbyadminapicall,
  billedtimesheetbyadminapicall,
  disapprovetimesheetbyadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../../common/EmptyFolder/Empty";
import StatCard from "../../../common/StatCard/StatCard";
import {Link} from "react-router-dom";
const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsTimesheetdata, setIsTimesheetdata] = useState([]);
  console.log(IsTimesheetdata, "Is timesheet data");
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectid, setProjectid] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const stats = [
    {
      label: "Total Hours",
      value: IsTimesheetdata.reduce(
        (sum, item) => sum + (parseInt(item.hours) || 0),
        0
      ),
      icon: <AccessTimeIcon color="primary" />,
    },
    {
      label: "Total Entries",
      value: IsTimesheetdata.length,
      icon: <ListIcon color="secondary" />,
    },
    {
      label: "Total Billed Hours",
      value: IsTimesheetdata.reduce(
        (sum, item) => sum + (item.billed_hours || 0),
        0
      ),
      icon: <ReceiptIcon color="success" />,
    },
    {
      label: "Total OK Hours",
      value: IsTimesheetdata.reduce(
        (sum, item) => sum + (item.ok_hours || 0),
        0
      ),
      icon: <CheckCircleIcon color="primary" />,
    },
  ];
  const fetchtimesheetfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchtimesheetapicall({
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          start_date: startDate,
          end_date: endDate,
          status,
        },
      });
      if (response.success) {
        dispatch(setLoader(false));
        setIsTimesheetdata(response.result);
        setTotalPages(response.totalPages);
      }
      console.log(response);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const handleUploadTimesheet = async (formData) => {
    try {
      dispatch(setLoader(true));
      const response = await uploadtimesheetcsvapicall(formData);
      if (response.success) {
        fetchtimesheetfunc();
        setIsModalOpen(false);
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCheckboxChange = (timesheetId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(timesheetId)) {
        return prevSelected.filter((id) => id !== timesheetId);
      }
      return [...prevSelected, timesheetId];
    });
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allIds = IsTimesheetdata.map((item) => item.Timesheet_Id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  // handlecheck box change all

  const approvetimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await approvetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const disapprovetimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await disapprovetimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const billedtimesheetfunc = async (values) => {
    try {
      dispatch(setLoader(true));
      const val = {
        id: isProjectid,
        payload: values,
      };
      const response = await billedtimesheetbyadminapicall(val);
      if (response?.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchtimesheetfunc();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        fetchtimesheetfunc();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    fetchtimesheetfunc();
  }, [page, rowsPerPage, search, startDate, endDate, status]);

  // selected

  const [selected, setSelected] = useState([]);
  console.log(selected, "selected");

  var isAllSelected =
    IsTimesheetdata.length > 0 && selected.length === IsTimesheetdata.length;
  const isIndeterminate =
    selected.length > 0 && selected.length < IsTimesheetdata.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(IsTimesheetdata.map((item) => item.Timesheet_Id));
    }
  };

  const toggleSelectRow = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  //selected
  return (
    <LayoutDesign>
      <BreadCrumb pageName="TimeSheet" />
      <Grid2 container spacing={2} sx={{my: 2}}>
        <Grid2 size={{md: 3, lg: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
        <Grid2 size={{md: 3, lg: 3, sm: 6, xs: 12}}>
          <StatCard />
        </Grid2>
      </Grid2>
      <Grid container spacing={2} sx={{my: 1}}>
        {stats.map((stat, index) => (
          <Grid item sm={12} md={3} lg={3} key={index}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {stat.icon}
              <Typography variant="h6">
                {stat.label}: {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div>
        <Button
          startIcon={<FileUploadIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "10px 15px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Upload Timesheet
        </Button>
        {/* <Button onClick={() => exportToExcel()}>Export to Excel</Button> */}

        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <UploadTimesheet
              setIsModalOpen={setIsModalOpen}
              handleUploadTimesheet={handleUploadTimesheet}
            />
          </Drawer>
        ) : null}
        {selectedItems.length > 0 ? (
          <div sx={{margin: "10px 0px"}}>
            <Button
              sx={{
                backgroundColor: "Green",
                color: "white",
                margin: "10px 0px",
                padding: "5px 10px",
              }}
              onClick={() => approvetimesheetfunc(selectedItems)}
            >
              Approve
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
              onClick={() => disapprovetimesheetfunc(selectedItems)}
            >
              DisApprove
            </Button>

            <Button
              sx={{
                backgroundColor: "skyblue",
                color: "white",
                margin: "10px 10px",
                padding: "5px 10px",
              }}
              onClick={() => billedtimesheetfunc(selectedItems)}
            >
              Billed
            </Button>
          </div>
        ) : null}
      </div>

      {IsTimesheetdata.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={toggleSelectAll}
                />
                select all
              </th>
              <th className="table_head_data">Id</th>
              <th className="table_head_data">TimeSheet No.</th>
              <th className="table_head_data">Day </th>
              <th className="table_head_data">Project </th>
              <th className="table_head_data">Resource</th>
              <th className="table_head_data">Task Description </th>
              <th className="table_head_data">Total Hours</th>
              <th className="table_head_data">Billed Hours</th>
              <th className="table_head_data">Blank Hours</th>
              <th className="table_head_data">Ok Hours</th>
              <th className="table_head_data">Approval Status</th>
              <th className="table_head_data">Billing Status</th>
              <th className="table_head_data">Remarks</th>
              <th className="table_head_data">Attachment</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {IsTimesheetdata?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.Timesheet_Id)}
                        onChange={() => toggleSelectRow(item.Timesheet_Id)}
                      />
                    </td>
                    <td className="table_data">{item.Project_Name}</td>
                    <td className="table_data">{item.Project_Code}</td>
                    <td className="table_data">{item.Project_Hours}</td>
                    <td className="table_data">{item.Start_Date}</td>
                    <td className="table_data">{item.End_Date}</td>
                    <td className="table_data">{item.Project_Type}</td>

                    <td className="table_data">
                      <Link to={`/project-info/${item.ProjectId}`}>
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}
      {/* <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{shrink: true}}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{shrink: true}}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          select
          label="Status"
          variant="outlined"
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Button variant="contained" onClick={fetchtimesheetfunc}>
          Apply Filters
        </Button>
      </div> */}
    </LayoutDesign>
  );
};

export default Timesheet;
