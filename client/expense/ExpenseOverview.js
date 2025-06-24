// 📂 Lokasi: client/expense/ExpenseOverview.js

// 🧩 Import React dan PropTypes
import React from "react";
import PropTypes from "prop-types";

// 🎨 Komponen UI dari Material UI
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// 📌 Komponen untuk menampilkan ringkasan statistik pengeluaran
export default function ExpenseOverview({ expenses }) {
  // ✅ Hitung total semua pengeluaran
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // ✅ Hitung rata-rata pengeluaran (dengan 2 digit desimal)
  const average =
    expenses.length > 0 ? (total / expenses.length).toFixed(2) : 0;

  // ✅ Cari nilai pengeluaran tertinggi
  const highest = Math.max(...expenses.map((e) => e.amount), 0);

  // ✅ Cari nilai pengeluaran terendah
  const lowest = Math.min(...expenses.map((e) => e.amount), 0);

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        {/* 🔤 Judul ringkasan */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Overview
        </Typography>

        {/* 🔹 Garis pemisah */}
        <Divider sx={{ mb: 2 }} />

        {/* 📋 Daftar statistik */}
        <List>
          <ListItem>
            <ListItemText primary="Total Expenses" secondary={`$${total}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Average per Entry"
              secondary={`$${average}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Highest Expense" secondary={`$${highest}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lowest Expense" secondary={`$${lowest}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

// 📦 Validasi properti
ExpenseOverview.propTypes = {
  expenses: PropTypes.array.isRequired, // ⬅️ Harus berupa array berisi objek expense
};
