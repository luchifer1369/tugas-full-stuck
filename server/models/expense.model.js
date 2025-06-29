// 📂 Lokasi: server/models/expense.model.js

import mongoose from "mongoose";

// Definisikan struktur dokumen Expense dalam MongoDB
const ExpenseSchema = new mongoose.Schema(
  {
    // Judul pengeluaran
    title: {
      type: String,
      trim: true, // hapus spasi di awal/akhir string
      required: "Title is required", // validasi wajib isi
    },
    // Jumlah uang yang dikeluarkan
    amount: {
      type: Number,
      required: "Amount is required", // validasi wajib isi
    },
    // Kategori pengeluaran (misalnya: makanan, transportasi, dll.)
    category: {
      type: String,
      trim: true,
      required: "Category is required", // validasi wajib isi
    },
    // Tanggal pengeluaran dilakukan
    incurred_on: {
      type: Date,
      default: Date.now, // default: waktu saat ini jika tidak diisi
    },
    // Catatan tambahan
    notes: {
      type: String,
      default: "", // ✅ agar tidak undefined
      trim: true,
    },
    // Tanggal terakhir pengeluaran diubah (opsional)
    updated: Date,
    // Referensi ke user yang membuat pengeluaran
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // relasi ke koleksi User
    },
  },
  {
    // Aktifkan timestamp otomatis: createdAt dan updatedAt
    timestamps: true,
  }
);

// Ekspor model Expense agar bisa digunakan di controller atau tempat lain
export default mongoose.model("Expense", ExpenseSchema);
