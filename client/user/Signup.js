// 📂 Lokasi: client/user/Signup.js

// 📦 Import modul React dan komponen MUI yang diperlukan
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/system";
import { create } from "./api-user.js"; // 🔁 Fungsi untuk kirim data signup ke backend
import { Link } from "react-router-dom"; // 🔗 Untuk navigasi ke halaman lain setelah signup

// 🎨 Styled component untuk tampilan Card signup
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}));

// 🎨 Styled component untuk TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300,
}));

// 🎨 Styled component untuk tombol submit
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

// ✅ Komponen utama Signup
export default function Signup() {
  // 🔧 State untuk menyimpan data form dan feedback
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false, // 🚪 State untuk membuka dialog sukses
    error: "", // ❌ Pesan error jika validasi gagal atau backend error
  });

  // 🔄 Fungsi handler perubahan input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // 📤 Fungsi untuk submit data ke server
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    // 🔁 Kirim data ke API
    create(user).then((data) => {
      if (data.error) {
        // ❌ Jika ada error dari server, tampilkan pesan error
        setValues({ ...values, error: data.error });
      } else {
        // ✅ Jika berhasil, kosongkan error dan tampilkan dialog sukses
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <div>
      {/* 📝 Form Sign Up */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
            Sign Up
          </Typography>

          {/* Input Nama */}
          <StyledTextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />

          {/* Input Email */}
          <StyledTextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />

          {/* Input Password */}
          <StyledTextField
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />

          {/* Tampilkan pesan error jika ada */}
          {values.error && (
            <Typography
              color="error"
              sx={{ display: "flex", alignItems: "center" }}>
              <ErrorOutlineIcon sx={{ mr: 1 }} />
              {values.error}
            </Typography>
          )}
        </CardContent>

        {/* Tombol Submit */}
        <CardActions>
          <SubmitButton
            color="primary"
            variant="contained"
            onClick={clickSubmit}>
            Submit
          </SubmitButton>
        </CardActions>
      </StyledCard>

      {/* 🪧 Dialog muncul jika signup sukses */}
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Navigasi ke halaman signin */}
          <Link to="/signin">
            <Button color="primary" autoFocus variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
