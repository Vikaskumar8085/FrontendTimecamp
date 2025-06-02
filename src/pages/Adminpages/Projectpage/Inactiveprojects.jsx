import React, {useEffect, useState} from "react";
import {fetchinactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import Empty from "../../../common/EmptyFolder/Empty";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Inactiveprojects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(0);
  const [viewMode, setViewMode] = useState("table");
  const getinactiveprojectfunc = async () => {
    try {
      const response = await fetchinactiveprojectsapicall({
        params: {page: page + 1, limit: rowsPerPage, search},
      });
      console.log(response);

      if (response.success) {
        setProjects(response.result);
        setTotalProjects(response.totalProjects);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getinactiveprojectfunc();
  }, [page, search, rowsPerPage]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="InActive Projects" />

      {projects.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">Project Name</th>
              <th className="table_head_data">Project Code </th>
              <th className="table_head_data">Project Hours </th>
              <th className="table_head_data">Start Date</th>
              <th className="table_head_data">End Date </th>
              <th className="table_head_data">Project Type</th>
              <th className="table_head_data">Action </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {projects?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
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
    </LayoutDesign>
  );
};

export default Inactiveprojects;
