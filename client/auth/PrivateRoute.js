// 📂 Lokasi: client/auth/PrivateRoute.js

// Import React dan komponen dari React Router
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Import modul auth-helper untuk mengecek status autentikasi
import auth from "./auth-helper";

// Komponen PrivateRoute berfungsi untuk membatasi akses ke halaman tertentu
const PrivateRoute = () => {
  // Ambil lokasi saat ini dari router, digunakan untuk redirect kembali setelah login
  const location = useLocation();

  // Jika pengguna sudah login (authenticated), tampilkan child route (Outlet)
  // Jika tidak, arahkan pengguna ke halaman /signin dan simpan lokasi asal sebagai state
  return auth.isAuthenticated() ? (
    <Outlet /> // Tampilkan komponen rute anak jika terautentikasi
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace /> // Redirect ke login
  );
};

// Ekspor komponen agar bisa digunakan di routing utama
export default PrivateRoute;
