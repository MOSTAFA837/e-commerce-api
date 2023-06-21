import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticated, isAdmin, createCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);
router.put("/:id", authenticated, isAdmin, updateCategory);
router.delete("/:id", authenticated, isAdmin, deleteCategory);

export default router;
