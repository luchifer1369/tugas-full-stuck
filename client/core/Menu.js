// 📂 Lokasi: client/core/Menu.js

// ✅ Import React dan komponen yang dibutuhkan dari MUI dan React Router
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper"; // Helper untuk autentikasi

// 📌 Komponen navigasi utama (navbar) aplikasi
export default function Menu() {
  const location = useLocation(); // Digunakan untuk mendapatkan path URL saat ini
  const navigate = useNavigate(); // Untuk melakukan navigasi programatik

  // 🎯 Fungsi untuk menentukan warna teks berdasarkan path aktif
  const isActive = (path) => {
    return location.pathname === path
      ? { color: "#ff4081" } // Warna pink jika aktif
      : { color: "#ffffff" }; // Warna putih jika tidak aktif
  };

  // 🔒 Fungsi untuk sign out user dan redirect ke halaman utama
  const handleSignout = () => {
    auth.clearJWT(() => navigate("/")); // Hapus JWT lalu redirect ke /
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* 🏠 Tombol Home */}
        <IconButton component={Link} to="/" sx={isActive("/")}>
          <Home />
        </IconButton>

        {/* 🔠 Judul aplikasi */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>

        {/* 👥 Menu untuk pengguna yang BELUM login */}
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

        {/* ✅ Menu untuk pengguna yang SUDAH login */}
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
