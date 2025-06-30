// 📂 Lokasi: client/core/Menu.js

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";
import AddIcon from "@mui/icons-material/Add";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? { color: "#ff4081" } : { color: "#ffffff" };

  const handleSignout = () => {
    auth.clearJWT(() => navigate("/"));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* KIRI */}
        <Typography variant="h6" sx={{ mr: 2 }}>
          MERN Expense Tracker
        </Typography>

        <IconButton component={Link} to="/" sx={isActive("/")}>
          <Home />
        </IconButton>

        {auth.isAuthenticated() && (
          <>
            <Button
              component={Link}
              to="/expenses"
              sx={isActive("/expenses")}
              enable={
                typeof window !== "undefined" &&
                !localStorage.getItem("hasExpenses")
              }>
              Expenses
            </Button>
            <Button component={Link} to="/reports" sx={isActive("/reports")}>
              Reports
            </Button>
          </>
        )}

        {/* SPACER */}
        <Box sx={{ flexGrow: 1 }} />

        {/* KANAN */}
        {auth.isAuthenticated() ? (
          <>
            <Button
              component={Link}
              to="/expenses/new"
              sx={{
                ...isActive("/expenses/new"),
                backgroundColor: "#fff",
                color: "#2bbd7e",
                "&:hover": {
                  backgroundColor: "#27a86f",
                  color: "#fff",
                },
              }}
              startIcon={<AddIcon />}>
              Add Expense
            </Button>

            {auth.isAuthenticated().user && (
              <Button
                component={Link}
                to={`/user/${auth.isAuthenticated().user._id}`}
                sx={isActive(`/user/${auth.isAuthenticated().user._id}`)}>
                My Profile
              </Button>
            )}
            <Button onClick={handleSignout} sx={{ color: "#ffffff" }}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/signup" sx={isActive("/signup")}>
              Sign up
            </Button>
            <Button component={Link} to="/signin" sx={isActive("/signin")}>
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
