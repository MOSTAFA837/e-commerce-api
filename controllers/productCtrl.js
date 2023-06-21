import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import slugify from "slugify";

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const title = req.body.title;
    if (title) {
      req.body.slug = slugify(title);
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
    // filtering
    const queryObj = { ...req.query };
    const excluded = ["page", "sort", "limit", "fields"];

    excluded.forEach((ex) => delete queryObj[ex]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // console.log(queryObj);
    // console.log(queryStr);
    // console.log(JSON.parse(queryStr));

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = 3;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productsLength = await Product.countDocuments();
      if (skip >= productsLength) throw new Error("This page doesn't exists");
    }

    const products = await query;
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

  const title = req.body.title;
  if (title) {
    req.body.slug = slugify(title);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      msg: `Successfully updated a product`,
      updatedProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const addToWishlist = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  try {
    const user = await User.findById(_id);
    const isAlreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

    if (isAlreadyAdded) {
      const { wishlist } = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );

      res.json({
        msg: "Successfully removed from wishlist.",
        wishlist,
      });
    } else {
      const { wishlist } = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      ).populate("wishlist");

      res.json({
        msg: "Successfully added to wishlist.",
        wishlist,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
