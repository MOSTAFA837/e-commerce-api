import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  rating,
  updateProduct,
} from "../controllers/productCtrl.js";

import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticated, isAdmin, createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.delete("/:id", authenticated, isAdmin, deleteProduct);
router.put("/wishlist", authenticated, addToWishlist);
router.put("/rating", authenticated, rating);
router.put("/:id", authenticated, isAdmin, updateProduct);

export default router;
