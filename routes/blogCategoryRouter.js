import express from "express";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategories,
  getBlogCategory,
  updateBlogCategory,
} from "../controllers/blogCategoryCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticated, isAdmin, createBlogCategory);
router.get("/:id", getBlogCategory);
router.get("/", getAllBlogCategories);
router.put("/:id", authenticated, isAdmin, updateBlogCategory);
router.delete("/:id", authenticated, isAdmin, deleteBlogCategory);

export default router;
