import express from "express";

import {
  allUsers,
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/userCtrl.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", allUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
