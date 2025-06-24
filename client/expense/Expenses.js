// 📂 Lokasi: client/expense/Expenses.js

// 🧩 Import React dan hook bawaan
import React, { useState, useEffect } from "react";

// 🎨 Komponen dari MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  TextField,
  Button,
  Icon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

// 🗓️ Komponen tanggal
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// 🔐 Autentikasi & API
import auth from "../auth/auth-helper";
import { listByUser, update } from "./api-expense.js";
import DeleteExpense from "./DeleteExpense";
import { Navigate } from "react-router-dom";

// 🎨 Styling root container
const Root = styled("div")(({ theme }) => ({
  width: "90%",
  maxWidth: 800,
  margin: "auto",
  marginTop: 40,
  marginBottom: 40,
}));

// 🎨 Styling input
const TextInput = styled(TextField)(({ theme }) => ({
  margin: "8px 16px",
  width: 240,
}));

// 🎨 Area filter tanggal (atas)
const SearchSection = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

// 🚀 Komponen utama untuk menampilkan dan mengelola daftar expense
export default function Expenses() {
  const [expenses, setExpenses] = useState([]); // Data pengeluaran
  const [redirectToSignin, setRedirectToSignin] = useState(false); // Redirect jika tidak login
  const [saved, setSaved] = useState(false); // Menandai data tersimpan
  const [error, setError] = useState(""); // Menampung error
  const jwt = auth.isAuthenticated(); // Token user

  // 🗓️ Tanggal default untuk pencarian awal bulan
  const today = new Date(),
    y = today.getFullYear(),
    m = today.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));

  // 🔄 Fetch data awal berdasarkan bulan saat ini
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByUser({ month: firstDay }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setExpenses(data);
      }
    });

    return () => abortController.abort();
  }, []);

  // 📆 Handle perubahan tanggal filter
  const handleDateChange = (name) => (date) => {
    if (name === "firstDay") setFirstDay(date);
    else setLastDay(date);
  };

  // 🔍 Ambil data saat tombol GO ditekan
  const searchClicked = () => {
    listByUser({ month: firstDay }, { t: jwt.token }).then((data) => {
      if (data.error) setRedirectToSignin(true);
      else setExpenses(data);
    });
  };

  // 🔧 Handle perubahan nilai input (title, amount, category, notes)
  const handleChange = (name, index) => (event) => {
    const updated = [...expenses];
    updated[index][name] = event.target.value;
    setExpenses(updated);
  };

  // 🔧 Update tanggal untuk setiap item
  const handleUpdateDate = (index) => (date) => {
    const updated = [...expenses];
    updated[index].incurred_on = date;
    setExpenses(updated);
  };

  // 💾 Klik tombol update - simpan ke backend
  const clickUpdate = (index) => {
    const expense = expenses[index];
    update({ expenseId: expense._id }, { t: jwt.token }, expense).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      }
    );
  };

  // 🗑️ Hapus data dari UI setelah backend berhasil hapus
  const removeExpense = (expense) => {
    const updated = expenses.filter((e) => e._id !== expense._id);
    setExpenses(updated);
  };

  // 🔐 Redirect ke signin jika tidak login
  if (redirectToSignin) return <Navigate to="/signin" />;

  return (
    <Root>
      {/* 🔍 Bagian filter tanggal */}
      <SearchSection>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="FROM"
            value={firstDay}
            onChange={handleDateChange("firstDay")}
            slotProps={{
              textField: { variant: "outlined", className: TextInput },
            }}
          />
          <DatePicker
            label="TO"
            value={lastDay}
            onChange={handleDateChange("lastDay")}
            slotProps={{
              textField: { variant: "outlined", className: TextInput },
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" color="secondary" onClick={searchClicked}>
          GO
        </Button>
      </SearchSection>

      {/* 📝 Tampilkan setiap expense dalam accordion */}
      {expenses.map((expense, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ marginRight: 32, width: 90 }}>
              <Typography sx={{ fontSize: "2em", color: "#2bbd7e" }}>
                ${expense.amount}
              </Typography>
              <Divider />
              <Typography>{expense.category}</Typography>
              <Typography sx={{ fontSize: "0.9em", color: "#888" }}>
                {expense.incurred_on && !isNaN(new Date(expense.incurred_on))
                  ? new Date(expense.incurred_on).toLocaleDateString()
                  : "Invalid date"}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">{expense.title}</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {expense.notes}
              </Typography>
            </div>
          </AccordionSummary>

          {/* 🔧 Form edit untuk setiap item */}
          <AccordionDetails sx={{ display: "block" }}>
            <TextField
              label="Title"
              value={expense.title}
              onChange={handleChange("title", index)}
              className="textfield"
              margin="normal"
            />
            <TextField
              label="Amount ($)"
              value={expense.amount}
              onChange={handleChange("amount", index)}
              className="textfield"
              margin="normal"
              type="number"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Incurred on"
                value={expense.incurred_on}
                onChange={handleUpdateDate(index)}
                slotProps={{
                  textField: { variant: "outlined", className: TextInput },
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Category"
              value={expense.category}
              onChange={handleChange("category", index)}
              className="textfield"
              margin="normal"
            />
            <TextField
              label="Notes"
              multiline
              rows={2}
              value={expense.notes}
              onChange={handleChange("notes", index)}
              className="textfield"
              margin="normal"
            />

            {/* 🔘 Tombol update dan delete */}
            <div style={{ textAlign: "right" }}>
              {error && (
                <Typography component="p" color="error">
                  <Icon color="error">error</Icon> {error}
                </Typography>
              )}
              {saved && (
                <Typography component="span" color="secondary" sx={{ mr: 2 }}>
                  Saved
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => clickUpdate(index)}>
                Update
              </Button>
              <DeleteExpense expense={expense} onRemove={removeExpense} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Root>
  );
}
