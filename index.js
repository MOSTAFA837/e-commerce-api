import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { dbConnect } from "./db/connectdb.js";
import authRouter from "./routes/authRouter.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

dbConnect();

app.use("/api/user", authRouter);
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
