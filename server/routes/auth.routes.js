// 📂 server/routes/user.routes.js

import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(userCtrl.list).post(userCtrl.create);

router
  .route("/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;
