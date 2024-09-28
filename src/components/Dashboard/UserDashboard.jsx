import React, { useContext } from "react";
import { handleLogout } from "../Login/Logout";


const UserDashboard = () => {

  return (
    
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, user! Here is your personalized content.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
