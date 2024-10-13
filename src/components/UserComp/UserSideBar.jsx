import React, { useContext, useState } from "react";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import { UserContext } from "../../contexts/userContext";

function UserSideBar({ Component }) {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("/user/dashboard");
  const drawerWidth = 240;
  const navigate = useNavigate();
  const location = useLocation();
  const mainContentWidth = open ? `calc(100vw - ${drawerWidth}px)` : '100vw';
  const { user, setUser } = useContext(UserContext);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSelectedMenu = (menu) => {
    navigate(menu);
  };

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
              Welcome {user?.user?.email}!
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <ShoppingCartIcon sx={{ cursor: "pointer" }} fontSize="large" />
            <LogoutButton />
          </Box>
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
          },
        }}
      >
        <Divider sx={{ marginTop: "3.5rem" }} />

        <List>
          <ListItem
            button
            onClick={() => handleSelectedMenu("/user/dashboard")}
            sx={{
              backgroundColor:
                selectedMenu === "/user/dashboard" ? "#8ec9ff" : "transparent",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                cursor: "pointer",
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            button
            onClick={() => handleSelectedMenu("/user/products")}
            sx={{
              backgroundColor:
                selectedMenu === "/user/products" ? "#8ec9ff" : "transparent",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <ProductIcon />
            </ListItemIcon>
            <ListItemText primary="All products" sx={{ cursor: "pointer" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2, // Adjust padding as needed
          marginTop: "64px",
          minHeight: "calc(100vh - 64px)",
          width: mainContentWidth,
          marginLeft: open ? `${drawerWidth}px` : 0, // Adjust margin-left based on drawer state
          transition: "margin-left 0.3s ease", // Smooth transition for shifting the content
          display: 'flex',
          flexDirection: 'column',  // Allow stacking
          alignItems: 'flex-start', // Align to the left
          justifyContent: 'flex-start', // Align to the top
        }}
      >
        <Component />
      </Box>
    </Box>
  );
}

export default UserSideBar;
