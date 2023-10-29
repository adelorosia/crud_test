import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

export const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    throw new Error("a user have with this Email been registered");
  try {
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    res.json("successfuly created");
  } catch (error) {
    res.json(error.message);
  }
});

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json("updated successfull");
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.json("delete successfull");
  } catch (error) {
    res.json(error.message);
  }
};

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundUser =await userModel.findOne({ email });
  if (foundUser && foundUser.isPasswordMatched(password)) {
    const userId = foundUser._id;
    const firstName = foundUser.firstName;
    const lastName = foundUser.lastName;
    const emailUser = foundUser.email;
    const profilePhoto = foundUser.photo;
    const admin = foundUser.idAdmin;
    const isAccountVerified = foundUser.isAccountVerified;
    const accessToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailUser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailUser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});
