import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productCtrl.js";

import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.delete("/:id", authenticated, isAdmin, deleteProduct);
router.put("/:id", authenticated, isAdmin, updateProduct);

export default router;
