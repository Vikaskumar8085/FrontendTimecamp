import React, { useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import UserProfile from "../../Component/DashboardComponents/ProfileComponent/UserProfile";
import LayoutDesign from "../../Layoutcomponents/LayoutDesign/LayoutDesign";
import ClientProfile from "../../Component/DashboardComponents/ProfileComponent/ClientProfile";
import StaffProfile from "../../Component/DashboardComponents/ProfileComponent/StaffProfile";

const Profile = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Profile" />

        {Role === "Admin" && (
          <div>
            <UserProfile user={userdata} />
          </div>
        )}
        {Role === "Client" && (
          <>
            <ClientProfile user={userdata} />
          </>
        )}
        {Role === "Employee" && (
          <div>
            <StaffProfile user={userdata} />
          </div>
        )}
        {Role === "Contractor" && (
          <>
            <StaffProfile user={userdata} />
          </>
        )}
        {Role === "Manager" && (
          <>
            <StaffProfile user={userdata} />
          </>
        )}
      </LayoutDesign>
    </>
  );
};

export default Profile;
