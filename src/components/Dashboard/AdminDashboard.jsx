import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Typography,
  Divider,
} from "@mui/material";
import {
  Storefront as ProductIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import LogoutButton from "../Login/Logout"; // Ensure this component is correctly exported
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = ({ comp: Component }) => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("dashboard"); // Initialize with "dashboard"
  const drawerWidth = 240; // Fixed drawer width in pixels
  const mainContentWidth = open ? `calc(100vw - ${drawerWidth}px)` : '100vw'; // Full viewport width or reduced by drawer width
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedMenu(location.pathname);
  },[location.pathname])

  const toggleDrawer = () => {
    setOpen(!open); // Toggle the open state of the drawer
  };

  const handleSelectedMenu = (menu) => {
    navigate(menu); // Navigate to the selected menu
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Box>

          {/* Right Section */}
          <LogoutButton /> {/* Ensure this component works correctly */}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
          },
        }}
      >
        <Divider sx={{ marginTop: "3.5rem" }} />
        
        <List>
          <ListItem
            button
            onClick={() => handleSelectedMenu("/admin/dashboard")}
            sx={{
              backgroundColor: selectedMenu === "/admin/dashboard" ? "#8ec9ff" : "transparent",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                cursor:'pointer'
              },
            }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleSelectedMenu("/admin/products")}
            sx={{
              backgroundColor: selectedMenu === "/admin/products" ? "#8ec9ff" : "transparent",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
              cursor:'pointer'
            }}
          >
            <ListItemIcon><ProductIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2, // Adjust padding as needed
          marginTop: "64px", // To account for AppBar height
          minHeight: "calc(100vh - 64px)",
          width: mainContentWidth, // Width calculated based on drawer state
          display: 'flex',
          flexDirection: 'column',  // Allow stacking
          alignItems: 'flex-start', // Align to the left
          justifyContent: 'flex-start', // Align to the top
        }}
      >
        {/* Assuming the Component will render the appropriate content */}
        <Component />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
