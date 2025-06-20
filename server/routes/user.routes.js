// 📂 Lokasi: server/routes/user.routes.js

import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

// Parameter middleware
router.param("userId", userCtrl.userByID);

export default router;
