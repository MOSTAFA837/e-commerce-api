import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);

    const category = await Category.create(req.body);

    res.json({
      msg: "Successfully created new category.",
      category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    res.json(await Category.find());
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(
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
      msg: "Successfully updated a category.",
      category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);

    res.json({
      msg: "Successfully deleted a category.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
