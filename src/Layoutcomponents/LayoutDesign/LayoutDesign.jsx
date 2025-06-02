import React, {useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
// import "../../pages/Home.scss";
import Header from "./Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {getuserapicall} from "../../ApiServices/UserApiServices/User";
import toast from "react-hot-toast";
import {fetchcompanyapicall} from "../../ApiServices/Companyapiservices";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {setUser} from "../../redux/User/UserSlice";

const LayoutDesign = ({children}) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => {
    return state.user.values;
  });
  const [iscompanydata, setIscompanydata] = useState("");

  let Role = userdata?.Role;

  const [openDropdown, setOpenDropdown] = React.useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const getProfileFunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getuserapicall();
      console.log(response.result, "response");
      if (response.success) {
        dispatch(setUser(response.result));
        dispatch(setLoader(false));
      } else {
        toast.error(response?.message);
        dispatch(setLoader(true));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(true));
    }
  };
  function redirectfunc() {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }

  const getcompanyfunc = async () => {
    try {
      const response = await fetchcompanyapicall();
      if (response.success) {
        setIscompanydata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    getProfileFunc();
    getcompanyfunc();
    redirectfunc();
  }, [0]);

  return (
    <>
      <div className="wrapper">
        {/* header */}
        <Header />
        {/* header */}
        <div className="wrapper_box">
          {/* sidebar */}
          <Sidebar
            toggleDropdown={toggleDropdown}
            openDropdown={openDropdown}
            Role={Role}
          />
          {/* sidebar */}
          {/* content */}
          <div className="wrapper_content">{children}</div>
          {/* content */}
        </div>
      </div>
    </>
  );
};

export default LayoutDesign;
