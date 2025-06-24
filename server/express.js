// 📂 Lokasi: server/express.js

// ✅ Import modul-modul utama
import express from "express";
const app = express();
import path from "path";
import cookieParser from "cookie-parser";
import compress from "compression"; // untuk mengompresi respons HTTP
import cors from "cors"; // untuk menangani cross-origin request
import helmet from "helmet"; // untuk mengamankan HTTP headers
import mongoose from "mongoose";

// ✅ Import konfigurasi dan route
import config from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import devBundle from "./devBundle.js"; // Hot reloading (hanya development)

// ✅ Jalankan hot-reload saat tidak di production
if (process.env.NODE_ENV !== "production") {
  devBundle.compile(app);
}

// ✅ Ambil path direktori kerja saat ini
const CURRENT_WORKING_DIR = process.cwd();

// ✅ Koneksi ke MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`❌ Gagal terkoneksi ke database: ${config.mongoUri}`);
});

// ✅ Middleware global untuk seluruh request
app.use(express.json()); // Parsing body JSON
app.use(express.urlencoded({ extended: true })); // Parsing form data
app.use(cookieParser()); // Parsing cookie dari request
app.use(compress()); // Kompresi respon HTTP
app.use(helmet()); // Keamanan HTTP headers
app.use(cors()); // Cross-Origin Resource Sharing

// ✅ Routing API (pastikan urutan ini sebelum static/frontend)
app.use("/api/users", userRoutes); // User-related routes
app.use("/auth", authRoutes); // Auth-related routes
app.use("/api/expenses", expenseRoutes); // Expense-related routes

// ✅ Static file dari folder dist (hasil bundle Webpack)
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// ✅ Logger route debug (opsional untuk development)
app.use((req, res, next) => {
  console.log("🛣️  Route:", req.method, req.originalUrl);
  next();
});

// ✅ Fallback untuk semua route frontend: kirim index.html React
app.get("*", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "public/index.html"));
});

export default app;
