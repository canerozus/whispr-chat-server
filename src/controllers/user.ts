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
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordCheck = "test";
  } catch (err) {
    console.log(err);
  }
};
