// 📂 Lokasi: server/express.js

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import config from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const CURRENT_WORKING_DIR = process.cwd();

// ✅ Inisialisasi Express app
const app = express();

// ✅ Koneksi ke MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`❌ Gagal terkoneksi ke database: ${config.mongoUri}`);
});

// ✅ Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// ✅ Serve static files (bundle.js) dari /dist
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// ✅ Routing API
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Serve index.html untuk semua rute selain API
app.get("*", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "public/index.html"));
});

// ✅ Default error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Token tidak valid." });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default app;
