import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { dbConnect } from "./db/connectdb.js";

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

dbConnect();

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
