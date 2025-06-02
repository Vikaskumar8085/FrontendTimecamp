import React, {useEffect, useState} from "react";
import {fetchinactivecontractorapicall} from "../../../ApiServices/AdminApiServices/Contractor";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Chip} from "@mui/material";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
const InActivecontractor = () => {
  const [isInActivecontractordata, setIsInActivecontractordata] = useState([]);
  console.log(isInActivecontractordata,"isisInActivecontractordata")
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); // Page starts from 0 in TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalCount, setTotalCount] = useState(0);

  const getInactivecontractor = async () => {
    setLoading(true);
    try {
      const response = await fetchinactivecontractorapicall({
        params: {
          search,
          page: page + 1, // Backend usually expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsInActivecontractordata(response.result);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInactivecontractor();
  }, [search, page, rowsPerPage]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="InActive contractor" />
      {isInActivecontractordata.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">FirstName</th>
              <th className="table_head_data">LastName </th>
              <th className="table_head_data">UserName </th>
              <th className="table_head_data">Email</th>
              <th className="table_head_data">Phone </th>
              <th className="table_head_data">Manager</th>
              <th className="table_head_data">Address </th>
              <th className="table_head_data">Action </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {isInActivecontractordata?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{item.FirstName}</td>
                    <td className="table_data">{item.LastName}</td>
                    <td className="table_data">{item.UserName}</td>
                    <td className="table_data">{item.Email}</td>
                    <td className="table_data">{item.Phone}</td>
                    <td className="table_data">
                      {
                        <Chip
                          label={item.Manager || "NA"}
                          color={item.Manager ? "success" : "error"}
                        />
                      }
                    </td>
                    <td className="table_data">{item.Address}</td>

                    <td className="table_data">
                      <Link to={`/contractor-info/${item.staff_Id}`}>
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

export default InActivecontractor;
