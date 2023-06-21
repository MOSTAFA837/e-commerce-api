import expressAsyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";

export const createCoupon = expressAsyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.json({
      msg: "Successfully created new coupon.",
      coupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await Coupon.findById(id);

    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllCoupons = expressAsyncHandler(async (req, res) => {
  try {
    res.json(await Coupon.find());
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      msg: "Successfully updated a coupon.",
      coupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Coupon.findByIdAndDelete(id);

    res.json({
      msg: "Successfully deleted a coupon.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
