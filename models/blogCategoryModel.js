import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BlogCategory ||
  mongoose.model("BlogCategory", blogCategorySchema);
