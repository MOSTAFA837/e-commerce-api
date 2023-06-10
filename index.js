import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/connectdb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

dbConnect();
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
