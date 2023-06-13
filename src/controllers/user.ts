import { Request, Response } from 'express';
import User from '../models/user';
import jwt from "jsonwebtoken"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};


export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, createdAt } = req.body;

     await User.create({ username, email, password, createdAt });

    res.status(201).json("User has been created!");
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
  }
};