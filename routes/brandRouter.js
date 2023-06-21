import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "../controllers/brandCtrl.js";
import { authenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticated, isAdmin, createBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrands);
router.put("/:id", authenticated, isAdmin, updateBrand);
router.delete("/:id", authenticated, isAdmin, deleteBrand);

export default router;
