// 📂 Lokasi: server/controllers/auth.controller.js

// 📌 Model User untuk akses database
import User from "../models/user.model.js";

// 🔐 JWT untuk membuat dan memverifikasi token
import jwt from "jsonwebtoken";

// ⚙️ Konfigurasi aplikasi (port, secret key, dsb)
import config from "../config/config.js";

/**
 * 🔐 signin: Proses login user
 * 1. Cari user berdasarkan email
 * 2. Verifikasi password
 * 3. Jika valid, buat JWT token
 * 4. Kirim token dan data user ke frontend
 */
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Cari user berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // 🔑 Verifikasi password menggunakan method authenticate dari model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    // 🎫 Buat JWT token yang menyimpan _id user
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "7d", // Token berlaku 7 hari
    });

    // 🍪 Simpan token di cookie (opsional)
    res.cookie("t", token, { expire: new Date() + 9999 });

    // ✅ Kirim token dan user info
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in",
    });
  }
};

/**
 * 🚪 signout: Logout user
 * Menghapus cookie token (opsional)
 */
const signout = (req, res) => {
  res.clearCookie("t"); // 🍪 Hapus token dari cookie
  return res.status(200).json({ message: "Signed out" });
};

/**
 * 🛡️ requireSignin: Middleware proteksi route
 * - Verifikasi JWT token dari Authorization header
 * - Jika valid, tambahkan data user ke req.auth
 */
const requireSignin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // 🔍 Ambil token dari header Authorization
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" }); // ❌ Jika tidak ada token
  }

  try {
    // ✅ Verifikasi token menggunakan secret
    const decoded = jwt.verify(token, config.jwtSecret);
    req.auth = decoded; // 💾 Simpan payload token ke req.auth
    next(); // 🔄 Lanjut ke controller berikutnya
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" }); // ❌ Token rusak / expired
  }
};

// 📦 Ekspor semua controller dalam satu objek
export default {
  signin,
  signout,
  requireSignin,
};
