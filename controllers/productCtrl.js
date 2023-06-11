import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      msg: "New product has been created successfully",
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);

    res.json({
      msg: `Successfully deleted a product`,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndUpdate(id, {
      title: req?.body?.title,
      slug: req?.body?.slug,
      description: req?.body?.description,
      price: req?.body?.price,
      category: req?.body?.category,
      brand: req?.body?.brand,
      quantity: req?.body?.quantity,
    });

    res.json({
      msg: `Successfully updated a product`,
    });
  } catch (error) {
    throw new Error(error);
  }
});
