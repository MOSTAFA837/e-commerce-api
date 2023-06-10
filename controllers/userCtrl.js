import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const register = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      msg: "User already exists",
      success: false,
    });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    res.json({
      _id: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      mobile: user?.mobile,
      role: user?.role,
      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});
