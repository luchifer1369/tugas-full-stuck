// 📂 Lokasi: server/express.js

import express from "express";
// ✅ Inisialisasi Express app
const app = express();
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
import devBundle from "./devBundle.js";

if (process.env.NODE_ENV !== "production") {
  devBundle.compile(app);
}

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
app.use((req, res, next) => {
  console.log("🛣️  Route:", req.method, req.originalUrl);
  next();
});

export default app;
