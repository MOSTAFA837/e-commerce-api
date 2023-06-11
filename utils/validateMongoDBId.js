import mongoose from "mongoose";

export const validateMongoDBId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) throw new Error("This id isn't valid or not found!");
};
