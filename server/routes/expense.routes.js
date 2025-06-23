// 📂 Lokasi: server/routes/expense.routes.js

import express from "express";
import expenseCtrl from "../controllers/expense.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Prefix "/api/expenses" sudah ditentukan di express.js
router
  .route("/current/preview")
  .get(authCtrl.requireSignin, expenseCtrl.currentMonthPreview);

router
  .route("/")
  .post(authCtrl.requireSignin, expenseCtrl.create)
  .get(authCtrl.requireSignin, expenseCtrl.listByUser);

router
  .route("/:expenseId")
  .get(authCtrl.requireSignin, expenseCtrl.read)
  .put(authCtrl.requireSignin, expenseCtrl.update)
  .delete(authCtrl.requireSignin, expenseCtrl.remove);

router.param("expenseId", expenseCtrl.expenseByID);

export default router;
