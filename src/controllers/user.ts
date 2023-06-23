import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, email, password, createdAt } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({ username, email, password: hashedPassword, createdAt });

    res.status(201).json("User has been created!");
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (passwordCheck) {
      jwt.sign(
        { email, id: user._id },
        process.env.JWT_SECRET,
        (err: any, token: any) => {
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json({ message: "logging in", id: user._id, email});
        }
      );
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "User logged out" });
};
