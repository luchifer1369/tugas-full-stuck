// 📂 Lokasi: client/user/EditProfile.js

// 🔃 React Hooks dan komponen MUI
import React, { useState, useEffect } from "react";
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
import { Navigate, useParams } from "react-router-dom";

// 🔐 Autentikasi dan API user
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user.js";

// 🎨 Styling untuk Card menggunakan styled-components dari MUI
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}));

// 🎨 Styling untuk TextField agar tampak rapi
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300,
}));

// 🎨 Tombol submit berada di tengah
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

// 📦 Komponen utama untuk mengedit profil pengguna
export default function EditProfile() {
  const { userId } = useParams(); // 🆔 Ambil userId dari URL
  const [values, setValues] = useState({
    name: "", // 🧑 Nama pengguna
    password: "", // 🔑 Password pengguna
    email: "", // 📧 Email pengguna
    redirectToProfile: false, // 🔁 Redirect setelah update
    error: "", // ❌ Menyimpan pesan error
  });

  const jwt = auth.isAuthenticated(); // 🔐 Ambil token JWT dari session

  // 🔄 Ambil data user saat component dimount
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // 📨 Ambil detail user dari server
    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        // ❌ Tangani error dari server
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        // ✅ Set data user ke state
        setValues((prev) => ({ ...prev, name: data.name, email: data.email }));
      }
    });

    return () => {
      abortController.abort(); // 🛑 Abort fetch jika komponen di-unmount
    };
  }, [userId]);

  // 📥 Tangani perubahan input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // ✅ Submit form untuk update profil
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    // 🚀 Kirim request update ke server
    update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        // ❌ Tampilkan error dari server
        setValues({ ...values, error: data.error });
      } else {
        // ✅ Redirect ke profil setelah sukses
        setValues({ ...values, redirectToProfile: true });
      }
    });
  };

  // 🔁 Jika redirect, arahkan ke halaman profil
  if (values.redirectToProfile) {
    return <Navigate to={`/user/${userId}`} />;
  }

  // 🖼️ Form edit profil ditampilkan di bawah ini
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Edit Profile
        </Typography>

        {/* 🔠 Input nama */}
        <StyledTextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <br />

        {/* 📧 Input email */}
        <StyledTextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />

        {/* 🔐 Input password */}
        <StyledTextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />

        {/* ❗ Tampilkan pesan error jika ada */}
        {values.error && (
          <Typography component="p" color="error">
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
