import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

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
    res.json(user);
  } else {
    throw new Error("Invalid credentials!");
  }
});
