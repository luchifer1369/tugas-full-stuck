// 📂 Lokasi: server/routes/expense.routes.js

import express from "express";
import expenseCtrl from "../controllers/expense.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// 📊 Route untuk menampilkan ringkasan pengeluaran bulan ini
// GET /api/expenses/current/preview
router
  .route("/current/preview")
  .get(authCtrl.requireSignin, expenseCtrl.currentMonthPreview);

// 📊 Route untuk mengambil daftar pengeluaran berdasarkan kategori
// GET /api/expenses/category
router
  .route("/category")
  .get(authCtrl.requireSignin, expenseCtrl.expenseByCategory);

// 📥📤 Route utama untuk membuat dan mengambil daftar semua pengeluaran user
// POST /api/expenses        -> buat expense baru
// GET  /api/expenses        -> ambil semua expense milik user login
router
  .route("/")
  .post(authCtrl.requireSignin, expenseCtrl.create)
  .get(authCtrl.requireSignin, expenseCtrl.listByUser);

// 📌 Route untuk manipulasi expense spesifik berdasarkan ID
// GET    /api/expenses/:expenseId -> baca expense tertentu
// PUT    /api/expenses/:expenseId -> update expense tertentu
// DELETE /api/expenses/:expenseId -> hapus expense tertentu
router
  .route("/:expenseId")
  .get(authCtrl.requireSignin, expenseCtrl.read)
  .put(authCtrl.requireSignin, expenseCtrl.update)
  .delete(authCtrl.requireSignin, expenseCtrl.remove);

// 🧩 Middleware param untuk pre-load expense berdasarkan :expenseId
router.param("expenseId", expenseCtrl.expenseByID);

export default router;
