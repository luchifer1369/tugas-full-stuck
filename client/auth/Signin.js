// 📂 Lokasi: client/auth/Signin.js

// ✅ Import dependensi React dan komponen MUI
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import { styled } from "@mui/system";

// ✅ Import navigasi dari React Router
import { Navigate, useLocation } from "react-router-dom";

// ✅ Import modul autentikasi lokal
import auth from "./auth-helper";
import { signin } from "./api-auth";

// ✅ Styling komponen Card menggunakan styled MUI
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}));

// ✅ Styling TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300,
}));

// ✅ Styling tombol submit
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

// ✅ Komponen utama untuk halaman login
export default function Signin() {
  const location = useLocation();

  // 🔒 State lokal untuk menyimpan nilai input dan status autentikasi
  const [values, setValues] = useState({
    email: "", // Email pengguna
    password: "", // Password pengguna
    error: "", // Menyimpan pesan error jika login gagal
    redirectToReferrer: false, // Menentukan apakah harus redirect setelah login sukses
  });

  // 📥 Handler untuk menangani input teks (email & password)
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // 📤 Fungsi untuk mengirim data login ke server
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    // 🔐 Kirim permintaan login ke API
    signin(user).then((data) => {
      if (data.error) {
        // ❌ Tampilkan pesan error jika gagal
        setValues({ ...values, error: data.error });
      } else {
        // ✅ Jika sukses, simpan token JWT dan arahkan ke halaman tujuan
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  // 🔁 Tentukan halaman asal jika pengguna dialihkan ke halaman login
  const from = location.state?.from || { pathname: "/" };

  // 🔀 Jika login sukses, redirect ke halaman asal
  if (values.redirectToReferrer) {
    return <Navigate to={from} />;
  }

  // 🖥️ Tampilan form login
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Sign In
        </Typography>

        {/* 📧 Input Email */}
        <StyledTextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />

        {/* 🔑 Input Password */}
        <StyledTextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />

        {/* ⚠️ Tampilkan error jika ada */}
        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 2 }}>
            <Icon color="error" sx={{ verticalAlign: "middle" }}>
              error
            </Icon>{" "}
            {values.error}
          </Typography>
        )}
      </CardContent>

      {/* 🔘 Tombol Submit */}
      <CardActions>
        <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </SubmitButton>
      </CardActions>
    </StyledCard>
  );
}
