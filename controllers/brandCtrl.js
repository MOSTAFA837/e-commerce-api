import expressAsyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import slugify from "slugify";

export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);

    const brand = await Brand.create(req.body);

    res.json({
      msg: "Successfully created new brand.",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await Brand.findById(id));
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBrands = expressAsyncHandler(async (req, res) => {
  try {
    res.json(await Brand.find());
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        slug: slugify(req.body.title),
      },
      {
        new: true,
      }
    );

    res.json({
      msg: "Successfully updated a brand.",
      brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Brand.findByIdAndDelete(id);

    res.json({
      msg: "Successfully deleted a brand.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
