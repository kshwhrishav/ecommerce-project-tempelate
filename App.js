import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserContext, UserProvider } from "./src/contexts/userContext";
import AdminRoutes from "./src/components/Routes/AdminRoutes";
import UserRoutes from "./src/components/Routes/UserRoutes";
import Login from "./src/components/Login/Login";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./src/styles/theme";
import './src/styles/main.scss';

const MainContent = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true); // Loading state
  
    // Check for user in localStorage and set the context on initial load
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false); // Loading completed
    }, [setUser]);
  
    if (loading) {
      return <div>Loading...</div>; // Optionally render a loading indicator
    }
  
    if (!user || Object.keys(user).length === 0) {
      return <Navigate to="/login" />; // Redirect to login if no user is logged in
    }
  
    return user.role === "admin" ? <AdminRoutes /> : <UserRoutes />;
  };
  
  export default MainContent;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="ecom-main">
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<MainContent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
