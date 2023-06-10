import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const db = mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB error");
  }
};
