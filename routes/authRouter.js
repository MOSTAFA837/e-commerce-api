import express from "express";

import {
  allUsers,
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/userCtrl.js";
import { authenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", allUsers);
router.get("/:id", authenticated, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
