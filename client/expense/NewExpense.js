// 📂 Lokasi: client/expense/NewExpense.js

// 🔽 Import pustaka dan komponen yang diperlukan
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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// 🔽 Import fungsi API dan autentikasi
import { create } from "./api-expense.js";
import auth from "../auth/auth-helper";
import { Link, Navigate } from "react-router-dom";

// 🎨 Komponen bergaya untuk tampilan form
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

// 🔰 Komponen utama untuk menambahkan data pengeluaran
export default function NewExpense() {
  const jwt = auth.isAuthenticated(); // Ambil token user yang sedang login

  // 🧠 State untuk menyimpan data form
  const [values, setValues] = useState({
    title: "", // Judul pengeluaran
    category: "", // Kategori pengeluaran
    amount: "", // Nominal pengeluaran
    incurred_on: new Date(), // Tanggal kejadian default: sekarang
    notes: "", // Catatan tambahan
    error: "", // Error message jika validasi gagal
    redirect: false, // Redirect ke halaman utama jika berhasil
  });

  // 📥 Tangani input teks
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  // 📆 Tangani perubahan tanggal
  const handleDateChange = (date) => {
    if (!isNaN(new Date(date))) {
      setValues({ ...values, incurred_on: date, error: "" });
    } else {
      setValues({ ...values, error: "Invalid date selected." });
    }
  };

  // 🔘 Tangani klik tombol submit
  const clickSubmit = () => {
    const { title, category, amount, incurred_on } = values;

    // ⚠️ Validasi input wajib
    if (!title || !category || !amount || !incurred_on) {
      setValues({ ...values, error: "All fields are required." });
      return;
    }

    // ⚠️ Validasi tanggal
    if (isNaN(new Date(incurred_on))) {
      setValues({ ...values, error: "Date is not valid." });
      return;
    }

    // 🔧 Siapkan data yang akan dikirim ke backend
    const expense = {
      title,
      category,
      amount,
      incurred_on,
      notes: values.notes || undefined,
    };

    // 🚀 Kirim data ke backend
    create({ t: jwt.token }, expense).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error }); // ❌ Gagal simpan
      } else {
        setValues({ ...values, redirect: true }); // ✅ Berhasil simpan
      }
    });
  };

  // 🔁 Redirect setelah submit sukses
  if (values.redirect) {
    return <Navigate to="/" />;
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Expense Record
        </Typography>

        {/* 📌 Input judul */}
        <StyledTextField
          id="title"
          label="Title"
          value={values.title}
          onChange={handleChange("title")}
          margin="normal"
        />
        <br />

        {/* 📌 Input jumlah */}
        <StyledTextField
          id="amount"
          label="Amount ($)"
          type="number"
          value={values.amount}
          onChange={handleChange("amount")}
          margin="normal"
        />
        <br />

        {/* 📌 Input kategori */}
        <StyledTextField
          id="category"
          label="Category"
          value={values.category}
          onChange={handleChange("category")}
          margin="normal"
        />
        <br />

        {/* 📌 Input tanggal kejadian */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Incurred on"
            value={values.incurred_on}
            onChange={handleDateChange}
            renderInput={(params) => (
              <StyledTextField {...params} margin="normal" />
            )}
          />
        </LocalizationProvider>
        <br />
        <br />

        {/* 📌 Input catatan tambahan */}
        <StyledTextField
          id="notes"
          label="Notes"
          multiline
          rows={2}
          value={values.notes}
          onChange={handleChange("notes")}
          margin="normal"
        />
        <br />

        {/* ⚠️ Tampilkan error jika ada */}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" sx={{ verticalAlign: "middle" }}>
              error
            </Icon>{" "}
            {values.error}
          </Typography>
        )}
      </CardContent>

      {/* 🔘 Tombol aksi */}
      <CardActions>
        <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </SubmitButton>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </CardActions>
    </StyledCard>
  );
}
