import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@mui/material";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientprojectaskapicall} from "../../ApiServices/Cllientapiservices/Client";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import Empty from "../../common/EmptyFolder/Empty";

import InputSearch from "../../common/InputSearch/InputSearch";
import Pagination from "../../common/Pagination/Pagination";
const ClientTaskPages = () => {
  const [IsClientTask, setClientTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const fetchclienttaskfunc = useCallback(async () => {
    try {
      const response = await fetchclientprojectaskapicall({
        params: {
          page: currentPage,
          limit: limit,
        },
      });
      if (response.success) {
        setClientTasks(response.result);
        setTotalPages(Math.ceil(response.totalProjects / limit));
      }
    } catch (error) {
      if (error?.response?.data?.redirect) {
        window.location.href = error?.response?.data.redirect;
        localStorage.clear();
      }
    }
  }, [currentPage]);

  useEffect(() => {
    fetchclienttaskfunc();
  }, [fetchclienttaskfunc]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Client Task" />

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

      {IsClientTask?.length > 0 ? (
        <>
          <table className="table_Container">
            <thead className="table_head">
              <tr className="head_row">
                <th className="table_head_data">Id</th>
                <th className="table_head_data">Task Name</th>
                <th className="table_head_data">Task Description </th>
                <th className="table_head_data">Priority </th>
                <th className="table_head_data">Status </th>
                <th className="table_head_data">Start Date </th>
                <th className="table_head_data">End Date </th>
                <th className="table_head_data">Estimated Time </th>
                <th className="table_head_data">Completed Time </th>
                <th className="table_head_data">Actions </th>
              </tr>
            </thead>
            <tbody className="table_body">
              {IsClientTask?.map((item, index) => {
                return (
                  <>
                    <tr className="body_row" key={index}>
                      <td className="table_data">{index + 1}</td>
                      <td className="table_data">{item.Task_Name}</td>
                      <td className="table_data">{item.Task_description}</td>
                      <td className="table_data">{item.Priority}</td>
                      <td className="table_data">{item.Status}</td>
                      <td className="table_data">{item.StartDate}</td>
                      <td className="table_data">{item.EndDate}</td>
                      <td className="table_data">{item.Estimated_Time}</td>
                      <td className="table_data">{item.Completed_time}</td>

                      <td className="table_data">
                        <Link to={`/client/client-taskinfo/${item.task_Id}`}>
                          <VisibilityIcon />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <Empty />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        pageSize={limit}
        onPageSizeChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1); // reset to first page when limit changes
        }}
      />
    </LayoutDesign>
  );
};

export default ClientTaskPages;
// const Pagination = ({currentPage, totalPages, onPageChange}) => {
//   if (totalPages <= 1) return null;

//   const pageNumbers = [];
//   const maxButtons = 5;
//   let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
//   let end = Math.min(totalPages, start + maxButtons - 1);

//   if (end - start < maxButtons - 1) {
//     start = Math.max(1, end - maxButtons + 1);
//   }

//   for (let i = start; i <= end; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination">
//       <button
//         className="pagination-btn"
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         {"< Back"}
//       </button>

//       {start > 1 && (
//         <>
//           <button className="pagination-btn" onClick={() => onPageChange(1)}>
//             1
//           </button>
//           {start > 2 && <span className="dots">...</span>}
//         </>
//       )}

//       {pageNumbers.map((page) => (
//         <button
//           key={page}
//           className={`pagination-btn ${page === currentPage ? "active" : ""}`}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </button>
//       ))}

//       {end < totalPages && (
//         <>
//           {end < totalPages - 1 && <span className="dots">...</span>}
//           <button
//             className="pagination-btn"
//             onClick={() => onPageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         </>
//       )}

//       <button
//         className="pagination-btn"
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         {"Next >"}
//       </button>
//     </div>
//   );
// };
