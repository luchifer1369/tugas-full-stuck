// 📂 Lokasi: client/core/Menu.js

import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? { color: "#ff4081" } : { color: "#ffffff" };

  const handleSignout = () => {
    auth.clearJWT(() => navigate("/"));
  };

  // Cek apakah ada expense
  const hasExpenses =
    typeof window !== "undefined" && localStorage.getItem("hasExpenses");

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Kiri */}
        <div>
          <IconButton component={Link} to="/" sx={isActive("/")}>
            <Home />
          </IconButton>
          <Typography
            variant="h6"
            component="span"
            sx={{ color: "white", ml: 1, mr: 2 }}
          >
            MERN Expense Tracker
          </Typography>
          {auth.isAuthenticated() && (
            <>
              {/* Tombol Expenses yang dinamis */}
              <Button
                component={Link}
                to={hasExpenses ? "/expenses" : "/expenses/new"}
                sx={{
                  ...isActive("/expenses"),
                  bgcolor: hasExpenses ? "inherit" : "#1976d2",
                }}
              >
                {hasExpenses ? "Expenses" : "Add Expense"}
              </Button>
              <Button
                component={Link}
                to="/reports"
                sx={isActive("/reports")}
              >
                Reports
              </Button>
            </>
          )}
        </div>

        {/* Kanan */}
        <div>
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
              {auth.isAuthenticated().user && (
                <Button
                  component={Link}
                  to={`/user/${auth.isAuthenticated().user._id}`}
                  sx={isActive(`/user/${auth.isAuthenticated().user._id}`)}
                >
                  My Profile
                </Button>
              )}
              <Button
                component={Link}
                to="/expenses/new"
                sx={isActive("/expenses/new")}
              >
                Add Expense
              </Button>
              <Button onClick={handleSignout} sx={{ color: "#ffffff" }}>
                Sign out
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
