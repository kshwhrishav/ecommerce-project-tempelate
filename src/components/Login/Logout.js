import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export const handleLogout = () => {
    const { setUser } = useContext(UserContext);
    // Clear user from context
    setUser(null);
    // Remove user from local storage
    localStorage.removeItem("user");
  };