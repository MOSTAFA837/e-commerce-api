import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const isProductExists = Product.findOne(req.body.slug);
    if (isProductExists) {
      throw new Error("product already exists");
    }

    const product = await Product.create(req.body);
    res.json({
      msg: "New product has been created successfully",
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});
