// 📂 Lokasi: client/expense/DeleteExpense.js

// 🧩 Import React dan Hook useState
import React, { useState } from "react";
// 🔍 PropTypes untuk validasi properti komponen
import PropTypes from "prop-types";
// 🎨 Komponen UI dari MUI (Material UI)
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// 🗑️ Icon Delete
import { Delete } from "@mui/icons-material";

// 🔌 Fungsi API untuk menghapus expense dari backend
import { remove } from "./api-expense.js";
// 🔐 Helper untuk autentikasi pengguna
import auth from "../auth/auth-helper";

// 📌 Komponen utama untuk menghapus data expense
export default function DeleteExpense({ expense, onRemove }) {
  // 🚪 State untuk mengatur dialog konfirmasi
  const [open, setOpen] = useState(false);
  // 🔑 Ambil token dari auth helper
  const jwt = auth.isAuthenticated();

  // 🔘 Ketika tombol delete diklik, tampilkan dialog
  const clickButton = () => {
    setOpen(true);
  };

  // 🧹 Fungsi untuk menghapus data expense dari server
  const deleteExpense = () => {
    remove({ expenseId: expense._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error); // Jika ada error, log ke konsol
      } else {
        setOpen(false); // Tutup dialog
        onRemove(expense); // Panggil callback dari parent untuk hapus dari UI
      }
    });
  };

  // ❌ Tutup dialog jika user batal
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* 🔘 Tombol icon delete */}
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <Delete />
      </IconButton>

      {/* 💬 Dialog konfirmasi hapus */}
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your expense entry titled "{expense.title}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* ❌ Batal hapus */}
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          {/* ✅ Konfirmasi hapus */}
          <Button onClick={deleteExpense} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// 📦 Validasi props wajib
DeleteExpense.propTypes = {
  expense: PropTypes.object.isRequired, // Data expense yang akan dihapus
  onRemove: PropTypes.func.isRequired, // Fungsi callback untuk update state di komponen induk
};
