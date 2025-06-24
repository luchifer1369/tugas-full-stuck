// 📂 Lokasi: server/config/config.js

// Objek konfigurasi utama untuk environment aplikasi
const config = {
  // 🟡 Environment mode (development / production)
  env: process.env.NODE_ENV || "development",

  // 🟢 Port server akan berjalan (bisa diset lewat .env atau default ke 3000)
  port: process.env.PORT || 3000,

  // 🔐 Secret key untuk JWT token (harus dirahasiakan di file .env)
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",

  // 🔗 URI koneksi ke MongoDB (pakai MONGODB_URI, atau fallback ke localhost)
  mongoUri:
    process.env.MONGODB_URI ||                // Prioritaskan dari variabel lingkungan MONGODB_URI
    process.env.MONGO_HOST ||                 // Atau dari MONGO_HOST
    "mongodb://127.0.0.1:27017/mern-expense-tracker", // Default lokal jika tidak ada ENV
};

// 🌐 Export agar bisa digunakan di seluruh backend
export default config;
