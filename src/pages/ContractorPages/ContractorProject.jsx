import React, {useCallback, useEffect, useState} from "react";
import {
  createcontractorprojectapicall,
  fetchContractorprojectsapicall,
} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
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
  Button,
  Drawer,
} from "@mui/material";
import {VisibilitySharp} from "@mui/icons-material";
import {Link} from "react-router-dom";
import ContractorForm from "../../Component/ContractorComponents/ContractorForm";
import {useDispatch, useSelector} from "react-redux";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import TModal from "../../common/Modal/TModal";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
const ContractorProject = () => {
  const [IsContractorProjectdata, setIsContractorProjectdata] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const userdata = useSelector((state) => state?.user.values);
  const dispatch = useDispatch();
  const fetchcontractorprojectfunc = useCallback(async () => {
    try {
      const response = await fetchContractorprojectsapicall();
      console.log(response, "contractor data");
      if (response.success) {
        setIsContractorProjectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, {});

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createcontractorprojectapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        setIsOpen(false);
        fetchcontractorprojectfunc();
      } else {
        dispatch(setLoader(false));
        toast.success(response?.message);
        setIsOpen(false);
      }
    } catch (error) {
      setIsOpen(false);
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchcontractorprojectfunc();
  }, [fetchcontractorprojectfunc]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Contractor Project" />
      {userdata?.Permission && (
        <Button
          onClick={() => setIsOpen(true)}
          sx={{
            my: 2,
            background: "#2c3e50",
            color: "white",
            padding: "10px 15px",
          }}
        >
          Create Project
        </Button>
      )}

      {isOpen && (
        <TModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="add Project"
        >
          <ContractorForm handleSubmit={handleSubmit} />
        </TModal>
      )}

      <TableContainer component={Paper} sx={{mt: 3}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Project Code</TableCell>
              <TableCell align="left">Project status</TableCell>
              <TableCell align="left">Project Type</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsContractorProjectdata?.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.Project_Name}</TableCell>
                    <TableCell>{item.Project_Code}</TableCell>
                    <TableCell>
                      {item.Project_Status === true ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell>{item.Project_Type}</TableCell>
                    <TableCell>
                      {new Date(item.Start_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.End_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/contractor/contractor-project-info/${item.ProjectId}`}
                      >
                        <VisibilitySharp />
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutDesign>
  );
};

export default ContractorProject;
