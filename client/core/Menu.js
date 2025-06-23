// 📂 Lokasi: client/core/Menu.js

import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path
      ? { color: "#ff4081" }
      : { color: "#ffffff" };
  };

  const handleSignout = () => {
    auth.clearJWT(() => navigate("/"));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton component={Link} to="/" sx={isActive("/")}>
          <Home />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {!auth.isAuthenticated() && (
          <>
            <Button component={Link} to="/signup" sx={isActive("/signup")}>
              Sign up
            </Button>
            <Button component={Link} to="/signin" sx={isActive("/signin")}>
              Sign In
            </Button>
          </>
        )}
        {auth.isAuthenticated() && (
          <>
            <Button component={Link} to="/user" sx={isActive("/user")}>
              Users
            </Button>
            <Button component={Link} to="/expenses" sx={isActive("/expenses")}>
              Expenses
            </Button>
            <Button component={Link} to="/reports" sx={isActive("/reports")}>
              Reports
            </Button>
            <Button
              component={Link}
              to={`/user/${auth.isAuthenticated().user._id}`}
              sx={isActive(`/user/${auth.isAuthenticated().user._id}`)}>
              My Profile
            </Button>
            <Button
              component={Link}
              to="/expenses/new"
              sx={isActive("/expenses/new")}>
              Add Expense
            </Button>
            <Button onClick={handleSignout} sx={{ color: "#ffffff" }}>
              Sign out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
