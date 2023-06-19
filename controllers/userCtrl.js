import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateRefreshToken, generateToken } from "../utils/jwt.js";
import { validateMongoDBId } from "../utils/validateMongoDBId.js";
import jwt from "jsonwebtoken";

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
    const refreshToken = generateRefreshToken(user?._id);
    await User.findByIdAndUpdate(
      user._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 259200000, // or 72 * 60 * 60 * 1000 = 3 days,
    });

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

// get user after logging by accessing refresh token
export const getRefreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new Error("No refresh token in cookies");

  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("You have to login again.");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id)
      throw new Error("There is something wrong with refresh token.");

    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
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
  validateMongoDBId(id);

  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDBId(id);

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

export const logout = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new Error("No refresh token in cookies.");

  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );

  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    })
    .sendStatus(204); // forbidden
});

export const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);

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
  validateMongoDBId(id);

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

export const updatePassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDBId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.json(user);
  }
});
