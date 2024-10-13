import { Box } from "@mui/system";
import React, { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { getProducts } from "../../firebase/firestoreservice";
import LogoutButton from "../Login/Logout";
import UserSideBar from "../UserComp/UserSideBar";

const UserDashboard = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="user_main_component">
      <Box>
        <h2>User Dashboard</h2>
        <p>Welcome, {user?.user?.email}! Here is your personalized content.</p>
        <LogoutButton />
      </Box>
    </div>
  );
};

export default UserDashboard;
