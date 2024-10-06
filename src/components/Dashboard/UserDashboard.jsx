import React, { useContext } from "react";
import LogoutButton from "../Login/Logout";


const UserDashboard = () => {

  return (

    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, user! Here is your personalized content.</p>
      <LogoutButton />
    </div>
  );
};

export default UserDashboard;
