// Import express dan controller autentikasi
import express from "express";
import authCtrl from "../controllers/auth.controller.js";

// Membuat instance router dari express
const router = express.Router();

// 🔐 Route untuk proses login (signin)
// Method: POST -> Mengirim data email dan password ke server
router.route("/signin").post(authCtrl.signin);

// 🔓 Route untuk proses logout (signout)
// Method: GET -> Menghapus cookie/token dari sisi client
router.route("/signout").get(authCtrl.signout);

// Ekspor router agar bisa digunakan di file utama express.js
export default router;
