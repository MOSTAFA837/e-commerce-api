import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  likeBlog,
  updateBlog,
} from "../controllers/blogCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticated, isAdmin, createBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);

router.put("/like", authenticated, likeBlog);

router.put("/:id", authenticated, isAdmin, updateBlog);
router.delete("/:id", authenticated, isAdmin, deleteBlog);

export default router;
