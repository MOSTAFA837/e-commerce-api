import express from "express";
import { authenticated, isAdmin } from "../middlewares/auth.js";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controllers/couponCtrl.js";
const router = express.Router();

router.post("/", authenticated, isAdmin, createCoupon);
router.get("/:id", getCoupon);
router.get("/", getAllCoupons);
router.put("/:id", authenticated, isAdmin, updateCoupon);
router.delete("/:id", authenticated, isAdmin, deleteCoupon);

export default router;
