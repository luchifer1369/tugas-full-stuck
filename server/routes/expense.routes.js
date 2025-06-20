// 📂 Lokasi: server/routes/expense.routes.js

import express from "express";
import expenseCtrl from "../controllers/expense.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/expenses/current/preview")
  .get(authCtrl.requireSignin, expenseCtrl.currentMonthPreview);

router
  .route("/api/expenses")
  .post(authCtrl.requireSignin, expenseCtrl.create)
  .get(authCtrl.requireSignin, expenseCtrl.listByUser);

router
  .route("/api/expenses/:expenseId")
  .get(authCtrl.requireSignin, expenseCtrl.read)
  .put(authCtrl.requireSignin, expenseCtrl.update)
  .delete(authCtrl.requireSignin, expenseCtrl.remove);

export default router;
