import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import blogRouter from "./routes/blogRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import blogCategoryRouter from "./routes/blogCategoryRouter.js";
import brandRouter from "./routes/brandRouter.js";
import couponRouter from "./routes/couponRouter.js";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { dbConnect } from "./db/connectdb.js";

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

dbConnect();

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
