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

export const allUsers = expressAsyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    throw new Error(error);
  }
});

export const getUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      msg: `${user.email} has been blocked successfully.`,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      msg: `${user.email} has been unblocked successfully.`,
    });
  } catch (error) {
    throw new Error(error);
  }
});
