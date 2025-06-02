import React, {useEffect, useState} from "react";
import {fetchdeadclientapicall} from "../../../ApiServices/AdminApiServices/Client";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Chip, Button, TextField} from "@mui/material";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import Empty from "../../../common/EmptyFolder/Empty";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
const Deadclient = () => {
  const [isdeadclientdata, setIsdeadclientdata] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClients, setTotalClients] = useState(0);

  const getdeadclient = async () => {
    try {
      setLoading(true);
      const response = await fetchdeadclientapicall({
        params: {
          search,
          page: page + 1, // Backend expects 1-based index
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIsdeadclientdata(response.result);
        setTotalClients(response.pagination.total);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdeadclient();
  }, [search, page, rowsPerPage]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Dead Client" />

      {/* <HeaderTab> */}
      {/* <Button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "0px 10px",
            color: "white",
          }}
        > */}
      {/* {viewMode === "table" ? <GridViewIcon /> : <TableViewIcon />} */}
      {/* </Button> */}
      {/* </HeaderTab> */}

      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        sx={{mb: 2}}
      />

      {isdeadclientdata.length > 0 ? (
        <table className="table_Container">
          <thead className="table_head">
            <tr className="head_row">
              <th className="table_head_data">Id</th>
              <th className="table_head_data">Company Name</th>
              <th className="table_head_data">Client Name </th>
              <th className="table_head_data">Client Email </th>
              <th className="table_head_data">Client Address</th>
              <th className="table_head_data">Client Postal Code </th>
              <th className="table_head_data">Gst Numar</th>
              <th className="table_head_data">Status </th>
              <th className="table_head_data">Action </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {isdeadclientdata?.map((item, index) => {
              return (
                <>
                  <tr className="body_row" key={index}>
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{item.Company_Name}</td>
                    <td className="table_data">{item.Client_Name}</td>
                    <td className="table_data">{item.Client_Phone}</td>
                    <td className="table_data">{item.Client_Address}</td>
                    <td className="table_data">{item.Client_Postal_Code}</td>
                    <td className="table_data">{item.GstNumber}</td>
                    <td className="table_data">
                      {
                        <Chip
                          label={item.Client_Status || "Unknown"}
                          color={
                            item.Client_Status === "COMPLETED"
                              ? "success"
                              : item.Client_Status === "INPROGRESS"
                              ? "primary"
                              : item.Client_Status === "P"
                              ? "warning"
                              : "default"
                          }
                        />
                      }
                    </td>

                    <td className="table_data">
                      <Link
                        style={{textDecoration: "none"}}
                        to={`/client-info/${item.Client_Id}`}
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
      ) : (
        <Empty />
      )}

      {/* <TablePagination
        component="div"
        count={totalClients}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        } */}
      {/* /> */}
    </LayoutDesign>
  );
};

export default Deadclient;
