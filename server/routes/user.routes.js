// Import modul Express dan controller user
import express from "express";
import userCtrl from "../controllers/user.controller.js";

// Membuat instance router
const router = express.Router();

// ⚠️ Catatan: Prefix "/api/users" sudah ditentukan di server utama (express.js),
// jadi semua path di bawah ini akan menjadi "/api/users" saat dijalankan.

// 📄 GET semua user dan POST user baru
router
  .route("/")
  .get(userCtrl.list) // Menampilkan daftar semua user
  .post(userCtrl.create); // Mendaftarkan user baru (sign up)

// 🔁 GET, PUT, DELETE berdasarkan user ID
router
  .route("/:userId")
  .get(userCtrl.read) // Menampilkan detail user berdasarkan ID
  .put(userCtrl.update) // Mengupdate data user
  .delete(userCtrl.remove); // Menghapus user

// 🧠 Middleware param untuk menangani :userId
// Fungsi ini akan mengeksekusi userByID dulu sebelum route /:userId diproses
router.param("userId", userCtrl.userByID);

// Ekspor router agar dapat digunakan di server utama
export default router;
