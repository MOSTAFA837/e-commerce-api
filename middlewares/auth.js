import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticated = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    // console.log("authorization :", req.headers.authorization);

    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //  console.log(decoded);

      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    } catch (error) {
      throw new Error(
        "Not authorized, token has been expired, please login again."
      );
    }
  } else {
    throw new Error("There is no token attached to headers.");
  }
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (user.role !== "admin") {
    throw new Error("You are not an admin!");
  } else {
    next();
  }
});
