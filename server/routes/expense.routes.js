// server/routes/expense.routes.js
// Import express dan controller terkait
import express from "express";
import expenseCtrl from "../controllers/expense.controller.js";
import authCtrl from "../controllers/auth.controller.js";

// Membuat instance router dari Express
const router = express.Router();

// Catatan: Prefix "/api/expenses" akan dipasang di express.js (contoh: app.use("/api/expenses", expenseRoutes))

// 📊 Route untuk menampilkan preview pengeluaran bulan ini
// Method: GET
// Middleware: requireSignin -> hanya user login yang bisa akses
router
  .route("/current/preview")
  .get(authCtrl.requireSignin, expenseCtrl.currentMonthPreview);

// 📥📤 Route utama untuk membuat dan mengambil daftar semua pengeluaran user
// Method: POST -> Membuat expense baru
// Method: GET -> Menampilkan semua expense milik user login
router
  .route("/")
  .post(authCtrl.requireSignin, expenseCtrl.create)
  .get(authCtrl.requireSignin, expenseCtrl.listByUser);

// 📌 Route untuk manipulasi expense spesifik berdasarkan ID
// Method: GET -> Menampilkan 1 expense berdasarkan ID
// Method: PUT -> Mengupdate expense tertentu
// Method: DELETE -> Menghapus expense tertentu
router
  .route("/:expenseId")
  .get(authCtrl.requireSignin, expenseCtrl.read)
  .put(authCtrl.requireSignin, expenseCtrl.update)
  .delete(authCtrl.requireSignin, expenseCtrl.remove);

// Middleware param -> otomatis dipanggil ketika ada ":expenseId" di URL
// Fungsi ini akan menambahkan objek expense ke req.expense
router.param("expenseId", expenseCtrl.expenseByID);

// 📊 Route untuk mengambil daftar pengeluaran berdasarkan kategori
router
  .route("/category")
  .get(authCtrl.requireSignin, expenseCtrl.expenseByCategory);

// Ekspor router agar bisa digunakan di file server utama
export default router;
