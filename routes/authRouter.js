import express from "express";

import {
  allUsers,
  blockUser,
  deleteUser,
  getUser,
  login,
  register,
  unblockUser,
  updateUser,
} from "../controllers/userCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/all-users", allUsers);
router.get("/:id", authenticated, isAdmin, getUser);

router.delete("/:id", deleteUser);
router.put("/edit-user", authenticated, updateUser);

router.put("/block-user/:id", authenticated, isAdmin, blockUser);
router.put("/unblock-user/:id", authenticated, isAdmin, unblockUser);

export default router;
