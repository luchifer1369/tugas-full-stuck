import mongoose from "mongoose";
import crypto from "crypto"; // Modul bawaan Node.js untuk enkripsi

// Definisi skema MongoDB untuk koleksi User
const UserSchema = new mongoose.Schema(
  {
    // Nama pengguna
    name: {
      type: String,
      trim: true, // Menghapus spasi di awal/akhir
      required: "Name is required", // Validasi: wajib diisi
    },
    // Email pengguna
    email: {
      type: String,
      trim: true,
      unique: "Email already exists", // Tidak boleh duplikat
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Validasi regex email
      required: "Email is required", // Validasi: wajib diisi
    },
    // Password yang sudah dienkripsi
    hashed_password: {
      type: String,
      required: "Password is required", // Validasi: wajib diisi
    },
    // Salt digunakan untuk hashing password
    salt: String,
    // Tanggal pembuatan akun
    created: {
      type: Date,
      default: Date.now,
    },
    // Tanggal terakhir diperbarui
    updated: Date,
  },
  {
    timestamps: true, // Tambahkan createdAt dan updatedAt otomatis
  }
);

// Virtual field: password asli (tidak disimpan di database)
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password; // Simpan sementara password asli
    this.salt = this.makeSalt(); // Buat salt baru
    this.hashed_password = this.encryptPassword(password); // Enkripsi password
  })
  .get(function () {
    return this._password;
  });

// Metode khusus UserSchema
UserSchema.methods = {
  // Metode untuk autentikasi: bandingkan password input dengan hashed_password
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  // Enkripsi password menggunakan HMAC-SHA256 dan salt
  encryptPassword(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt) // Gunakan salt sebagai key
        .update(password) // Data yang akan dienkripsi
        .digest("hex"); // Hasil enkripsi berupa string hex
    } catch (err) {
      return "";
    }
  },

  // Membuat salt (angka acak berbasis waktu sekarang dan Math.random)
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

// Ekspor model agar bisa digunakan di controller
export default mongoose.model("User", UserSchema);
