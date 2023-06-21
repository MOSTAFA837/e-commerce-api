import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

export const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.json({
      msg: `Successfully created a product`,
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    const blog = await Blog.findById(id);

    res.json({
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllBlogs = expressAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json({
      length: await Blog.countDocuments(),
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      msg: `Successfully updated a blog`,
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id, req.body, { new: true });

    res.json({
      msg: `Successfully deleted a blog`,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const likeBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;

  const blog = await Blog.findById(blogId);
  const reqUserId = req?.user._id;

  // is user disliked the blog
  const isUserDisliked = blog.dislikes.find(
    (userId) => userId.toString() === reqUserId.toString()
  );

  if (isUserDisliked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        isDisliked: false,
        $pull: { dislikes: reqUserId },
      },
      { new: true }
    );
  }

  // is user liked the blog
  const isLiked = blog.isLiked;

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        isLiked: false,
        $pull: { likes: reqUserId },
      },
      { new: true }
    );

    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        isLiked: true,
        $push: { likes: reqUserId },
      },
      { new: true }
    );

    res.json(blog);
  }
});

export const dislikeBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;

  const blog = await Blog.findById(blogId);
  const reqUserId = req?.user._id;

  // is user liked the blog
  const isUserLiked = blog.likes.find(
    (userId) => userId.toString() === reqUserId.toString()
  );

  if (isUserLiked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        isLiked: false,
        $pull: { likes: reqUserId },
      },
      { new: true }
    );
  }

  // // is user disliked the blog
  const isDisliked = blog.isDisliked;

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        isDisliked: false,
        $pull: { dislikes: reqUserId },
      },
      { new: true }
    );

    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        isDisliked: true,
        $push: { dislikes: reqUserId },
      },
      { new: true }
    );

    res.json(blog);
  }
});
