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
import devBundle from "./devBundle.js";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Only use devBundle in development
devBundle(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", expenseRoutes);

// Static client files
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  console.error("❌ Unable to connect to database.");
});

// 404 handler
app.use((req, res) => {
  return res.status(404).json({
    error: "Route not found",
  });
});

export default app;
