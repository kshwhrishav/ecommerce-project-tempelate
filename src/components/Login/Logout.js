import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // To redirect after logout

  const handleLogout = () => {
    // Clear user from context
    setUser(null);
    // Remove user from local storage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
