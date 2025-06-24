// 📂 Lokasi: server/controllers/user.controller.js

import User from "../models/user.model.js";
import extend from "lodash/extend.js";

/**
 * 🆕 Membuat pengguna baru dari data request (signup)
 */
const create = async (req, res) => {
  try {
    const user = new User(req.body); // Membuat instance user dari request body
    await user.save(); // Menyimpan user ke database
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Signup failed: " + err.message,
    });
  }
};

/**
 * 📃 Menampilkan daftar semua user (hanya nama, email, updated, created)
 */
const list = async (req, res) => {
  try {
    const users = await User.find().select("name email updated created");
    res.json(users); // Mengirim daftar user dalam format JSON
  } catch (err) {
    return res.status(400).json({
      error: "Failed to list users",
    });
  }
};

/**
 * 🧩 Middleware: Mengambil user berdasarkan :userId dari parameter URL
 * dan menaruhnya di req.profile agar bisa digunakan di fungsi selanjutnya
 */
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user; // Menyimpan user ke req untuk digunakan di read/update/delete
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

/**
 * 👤 Mengembalikan data user (profil) tanpa password dan salt
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined; // Hilangkan data sensitif
  req.profile.salt = undefined;
  return res.json(req.profile); // Kirim data user
};

/**
 * ✏️ Memperbarui data profil user
 */
const update = async (req, res) => {
  try {
    let user = req.profile; // Ambil user dari middleware userByID
    user = extend(user, req.body); // Gabungkan data baru ke user lama
    user.updated = Date.now(); // Tambahkan timestamp update
    await user.save(); // Simpan perubahan
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: "User update failed",
    });
  }
};

/**
 * ❌ Menghapus akun user dari database
 */
const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.deleteOne(); // Hapus user
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser); // Kirim data user yang telah dihapus
  } catch (err) {
    return res.status(400).json({
      error: "Failed to delete user",
    });
  }
};

// 🚀 Ekspor semua controller untuk digunakan di user.routes.js
export default {
  create,
  list,
  read,
  update,
  remove,
  userByID,
};
