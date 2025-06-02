import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";

import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";

import {fetchclientactiveprojectapicall} from "../../ApiServices/Cllientapiservices/Client";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Empty from "../../common/EmptyFolder/Empty";
import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";

const ClientActiveProject = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false); // State to manage loading

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [Isactiveclientprject, setisactiveclientproject] = useState([]);
  const pageSize = 10;

  const fetchclientactiveproject = async (page) => {
    try {
      const response = await fetchclientactiveprojectapicall({
        params: {
          page,
          limit: pageSize,
        },
      });
      if (response.success) {
        setisactiveclientproject(response.result);
        response.totalProjects;
      }
    } catch (error) {
      console.log(error?.message);
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const toggleView = () => {
    setView(view === "table" ? "grid" : "table");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchclientactiveproject(currentPage);
  }, [currentPage]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Client Active Project" />

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
        {Isactiveclientprject.length > 0 ? (
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
                {Isactiveclientprject?.map((item, index) => {
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
                          <Link
                            to={`/client/client-pageinfo/${item?.ProjectId}`}
                          >
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
    </>
  );
};

export default ClientActiveProject;
