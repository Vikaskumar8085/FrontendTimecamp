import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";

import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {fetchclientprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../common/EmptyFolder/Empty";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";
const ClientProjects = () => {
  const [Isclientdata, setisclientdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProjects, setTotalProjects] = useState(0);
  const [view, setView] = useState("table");
  const fetchclientproject = async () => {
    try {
      setLoading(true);
      const response = await fetchclientprojectapicall({
        params: {
          page: page + 1, // page starts from 1 in API
          limit: rowsPerPage,
          search: search,
        },
      });
      console.log(response, "response,response");
      if (response.success) {
        setisclientdata(response.result);
        setTotalProjects(response.totalProjects);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }

      console.log(error?.response?.data, "data");
      console.log(error?.message);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to the first page when search changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const toggleView = () => {
    setView(view === "table" ? "grid" : "table");
  };

  useEffect(() => {
    fetchclientproject();
  }, [page, rowsPerPage, search]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Client  Projects" />
      <div
        style={{
          display: "block",
          overflow: "hidden",
          position: "relative",
          margin: "10px 0px",
        }}
        className="client_header_container"
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div className="left_div">
            <Button>Sort</Button>
          </div>
          <div className="right_div">
            <InputSearch />
          </div>
        </div>
      </div>
      {Isclientdata.length > 0 ? (
        <>
          <table className="table_Container">
            <thead className="table_head">
              <tr className="head_row">
                <th className="table_head_data">Id</th>
                <th className="table_head_data">Project Name</th>
                <th className="table_head_data">Project Code </th>
                <th className="table_head_data">State Date </th>
                <th className="table_head_data">End Date</th>
                <th className="table_head_data">Project Hours</th>
                <th className="table_head_data">Actions</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {Isclientdata?.map((item, index) => {
                return (
                  <>
                    <tr className="body_row" key={index}>
                      <td className="table_data">{index + 1}</td>
                      <td className="table_data">{item.Project_Name}</td>
                      <td className="table_data">{item.Project_Code}</td>
                      <td className="table_data">{item.Start_Date}</td>
                      <td className="table_data">{item.End_Date}</td>
                      <td className="table_data">{item.Project_Hours}</td>
                      <td className="table_data">
                        <Link to={`/client/client-pageinfo/${item?.ProjectId}`}>
                          <VisibilityIcon />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <Pagination />
        </>
      ) : (
        <Empty />
      )}
    </LayoutDesign>
  );
};

export default ClientProjects;
