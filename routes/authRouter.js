import express from "express";
const router = express.Router();

import {
  allUsers,
  blockUser,
  deleteUser,
  forgetPasswordToken,
  getRefreshToken,
  getUser,
  login,
  logout,
  register,
  resetPassword,
  unblockUser,
  updatePassword,
  updateUser,
} from "../controllers/userCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", getRefreshToken);
router.get("/logout", logout);

router.put("/password", authenticated, updatePassword);

router.post("/forget-password-token", forgetPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.get("/all-users", allUsers);
router.get("/:id", authenticated, isAdmin, getUser);

router.delete("/:id", deleteUser);
router.put("/edit-user", authenticated, updateUser);

router.put("/block-user/:id", authenticated, isAdmin, blockUser);
router.put("/unblock-user/:id", authenticated, isAdmin, unblockUser);

export default router;
