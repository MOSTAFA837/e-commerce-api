import expressAsyncHandler from "express-async-handler";
import BlogCategory from "../models/blogCategoryModel.js";
import slugify from "slugify";

export const createBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);

    const blogCategory = await BlogCategory.create(req.body);

    res.json({
      msg: "Successfully created new category.",
      blogCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const blogCategory = await BlogCategory.findById(id);

    res.json(blogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBlogCategories = expressAsyncHandler(async (req, res) => {
  try {
    res.json(await BlogCategory.find());
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const blogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        slug: slugify(req.body.title),
      },
      {
        new: true,
      }
    );

    res.json(blogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await BlogCategory.findByIdAndDelete(id);

    res.json({
      msg: "Successfully deleted a blog category.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
