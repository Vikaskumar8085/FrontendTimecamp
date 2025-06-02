import React, {useEffect} from "react";
import {Link, Navigate} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import apiInstance from "../../ApiInstance/apiInstance";
import {useDispatch, useSelector} from "react-redux";
import {getuserapicall} from "../../ApiServices/UserApiServices/User";
import {setUser} from "../../redux/User/UserSlice";
const DefaultLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const getProfileFunc = async () => {
    try {
      const response = await getuserapicall();
      console.log(response, "response");
      if (response.success) {
        dispatch(setUser(response.result));
      }
    } catch (error) {
      console.group(error?.message);
    }
  };

  function redirectfunc() {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    getProfileFunc();
    redirectfunc();
  }, [0]);

  return (
    <>
      <div className="Layout_wrapper">
        {/* sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          Role={Role}
        />
        {/* sidebar */}

        <div className={`layout_main ${isSidebarOpen ? "open" : "closed"}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
